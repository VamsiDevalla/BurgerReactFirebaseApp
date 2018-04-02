import React,{ Component } from 'react';
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import Aux from '../../HOC/Auxilary';
import Burger from  '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Model/Model'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'
import * as actions from "../../Store/actions/index";





class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
            .map(key =>{
                return ingredients[key]
            }).reduce((sum,count)=>{
                return sum+count
            },0)
        return sum>0
    }

    purchaseHandler=()=>{
        this.setState({purchasing: true})
    }

    purchaseCanceledHandler=()=>{
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler=()=>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo ={...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let orderSummery = null
        let burger = this.props.error?<p>Can not load this page</p>:<Spinner/>

        if(this.props.ings){
            burger = <Aux>
                <Burger ingredients={this.props.ings}/>
                <BurgerControls
                    addIngredients={this.props.onIngredientAdded}
                    removeIngredients={this.props.onIngredientRemoved}
                    disable={disabledInfo}
                    price={this.props.burgerPrice}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummery = <OrderSummery
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                price={this.props.burgerPrice}
            />
        }

        return(
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCanceledHandler} >
                    {orderSummery}
                </Model>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        burgerPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))