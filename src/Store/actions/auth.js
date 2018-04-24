import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        authData: error
    }
}

export const auth = (email,password)=>{
    return dispatch =>{
        dispatch(authStart())
        const authdata ={
            email: email,
            password: password,
            resturnSecureToken: true
        }
        axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDwcLqBfNybGl57SYjRdMVJPW97RuQyshg",authdata)
            .then(res =>{
                console.log(res)
                dispatch(authSuccess(res))
            })
            .catch(err =>{
                console.log(err)
                dispatch(authFail(err))
            })
    }
}