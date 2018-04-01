import * as actiontypes from './actionsTypes'
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actiontypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type: actiontypes.FETCH_INGREDIENTS_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = ()=>{
    return{
        type: actiontypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json',orderData)
            .then(res => {

                dispatch(purchaseBurgerSuccess(res.data.name,orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    }
}

export const purchaseInit = () =>{
    return{
        type: actiontypes.PURCHASE_INIT
    }
}
