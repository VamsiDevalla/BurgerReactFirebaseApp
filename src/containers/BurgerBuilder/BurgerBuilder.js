import React,{ Component } from 'react';
import {connect} from 'react-redux'
import * as burgerBuilderActions from '../../Store/actions/index'

import Aux from '../../HOC/Auxilary';
import Burger from  '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Model/Model'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'

import axios from '../../axios-orders'



class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        error:null
    }

    componentDidMount(){
        // axios.get('/Ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients:response.data})
        //     })
        //     .catch(err =>{
        //         this.setState({error:true})
        //     })

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
        //alert("you continued")

        // const queryParam=[]
        // for(let i in this.state.ingredients){
        //     queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        //     queryParam.push('price=' + this.state.burgerPrice)
        // }
        // const queryString=queryParam.join('&')
        // this.props.history.push({
        //    pathname: '/checkout',
        //     search: '?'+queryString
        // })
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo ={...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let orderSummery = null
        let burger = this.state.error?<p>Can not load this page</p>:<Spinner/>

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

            if(this.state.loading) orderSummery=<Spinner/>
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
        ings: state.ingredients,
        burgerPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))