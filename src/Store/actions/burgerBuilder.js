import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGEDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://reactburger-9da07.firebaseio.com/Ingredients.json')
            .then(response=>{
                dispatch(setIngredients(response.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    }
}