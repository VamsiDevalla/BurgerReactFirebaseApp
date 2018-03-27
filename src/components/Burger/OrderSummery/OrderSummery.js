import React from 'react'
import Aux from '../../../HOC/Auxilary'
import Button from '../../UI/Button/Button'
const orderSummery = (props) =>{
    const ingredientList = Object.keys(props.ingredients)
        .map(igKey =>{
            return <li key={igKey}> <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>
        })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Summary:</p>
            <ul>
                {ingredientList}
            </ul>
            <strong><p>Total Price: ${props.price.toFixed(2)}</p></strong>
            <p>Do you want to check out?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummery