import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return{
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return{
        type : actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error
    }
}

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return{
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(authLogout())
        },expirationTime  * 1000)
    }
}

export const auth = (email,password,isSignup) => {
    const authData = {
        email,
        password,
        returnSecureToken : true
    }
    let urlConflict = isSignup ? 'signupNewUser' : 'verifyPassword' ;
    return dispatch => {
        dispatch(authStart());
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlConflict}?key=AIzaSyB8xXp4E5sykiDTIyb32AgwRFFprsm3M4c`,authData)
            .then(res => {
                console.log(res);

                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem("token",res.data.idToken);
                localStorage.setItem("expirationDate",expirationDate );
                localStorage.setItem("userId",res.data.localId);

                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })

    } 
}

export const setAuthRedirectPath = (path) => {
    return{
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authLogout())
        }else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate >= new Date()){
                const userId = localStorage.getItem("userId"); 
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }else{
                dispatch(authLogout())
            }
        }

    }
}