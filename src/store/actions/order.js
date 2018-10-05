import axios from '../../axios-orders';
import * as actionTypes from './actionsTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        id,
        orderData
    }
} 

export const purchaseBurgerFail = (error) => {
    return{
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
} 

export const purchaseBurgerStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return{
        type : actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
        .then(res => { 
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const fetchOrdersStart = () =>{
    return{
        type : actionTypes.FETCH_ORDERS_START
    }    
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) =>{
    return{
        type : actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrders = (token,userId) => {
    const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`orders.json?${queryParams}`)
            .then(res => {
                let fetchedOrders = [];
                console.log(res)
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id : key
                    });
                }
                console.log(fetchedOrders)
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}