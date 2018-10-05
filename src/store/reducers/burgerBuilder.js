import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients : null,
    totalPrice : 40,
    error : false,
    building : false
}

const INGREDIENT_PRICES = {
    salad : 30,
    meat : 70,
    chicken : 60,
    cheese : 40 
};

const addIngredient = (state, action) =>{
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updatedSt = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedSt);
}

const setIngredinets = (state, action) => {
    return updateObject(state, {
        error : false,
        ingredients : {
            salad : action.ingredients.salad,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat,
            chicken : action.ingredients.chicken
        },
        totalPrice : 40,
        building : false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state,{error : true})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredinets(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;    
    }
}

export default reducer;