import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import classes from './CheckOutSummry.css'
const checkOutSummry = (props)=>{
        return(
            <div className={classes.CheckOutSummry}>
                <h1>Hope You will like it</h1>
                <div style={{width:'100%',margin:'auto'}}>
                    <Burger ingredients={props.ingredients}/>
                </div>
                <Button btnType='Danger' clicked={props.onCheckoutCanceled}> Cancel </Button>
                <Button btnType='Success' clicked={props.onCheckoutContinued}> Continue </Button>
            </div>
        )
}
export default checkOutSummry