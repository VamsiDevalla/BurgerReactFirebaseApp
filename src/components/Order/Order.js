import React from 'react'
import classes from './Order.css'
import Burger from '../../components/Burger/Burger'
const order = (props) =>{
    const ingredients = []
    for(let ingredient in props.ingredients){
        ingredients.push(<h3 key={ingredient}>{ingredient} x {props.ingredients[ingredient]}</h3>)
    }

    return(
        <div className={classes.Order}>
            <div className={classes.Burger}>
                <Burger  ingredients={props.ingredients}/>
            </div>
            <div className={classes.Itenary}>
                {ingredients}
                <h2>Delivery Method: {props.delivery}</h2>
                <h1>Total price: ${(+props.price).toFixed(2)}</h1>
            </div>
        </div>
    )
}

export default order