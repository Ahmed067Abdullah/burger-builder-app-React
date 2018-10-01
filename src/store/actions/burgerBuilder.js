import axios from '../../axios-orders';
import * as actionTypes from './actionsTypes';

export const addIngredient = (ingName) =>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingName
    }
}

export const removeIngredient = (ingName) =>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return{
        type : actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(respone => {
            dispatch(setIngredients(respone.data))
        })
        .catch(err =>{ 
            dispatch(fetchIngredientsFailed())
        })
    }
}