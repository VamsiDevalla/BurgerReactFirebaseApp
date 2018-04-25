import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFail = (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch =>{
        setTimeout(()=>{
          dispatch(logOut())
        },expirationTime*1000)
    }

}

export const auth = (email,password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart())
        const authdata ={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDwcLqBfNybGl57SYjRdMVJPW97RuQyshg"
        if(!isSignUp)
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDwcLqBfNybGl57SYjRdMVJPW97RuQyshg"
        axios.post(url,authdata)
            .then(res =>{
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                console.log(res)
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err =>{
                dispatch(authFail(err.response.data.error))
            })

    }
}