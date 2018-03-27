import React,{ Component } from 'react';
import Aux from '../../HOC/Auxilary';
import Burger from  '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Model/Model'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 1,
    cheese: 0.7,
    meat: 1.3
};

class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        burgerPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:null
    }

    componentDidMount(){
        axios.get('/Ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            })
            .catch(err =>{
                this.setState({error:true})
            })

    }

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
            .map(key =>{
                return ingredients[key]
            }).reduce((sum,count)=>{
                return sum+count
            },0)
        this.setState({purchasable: sum>0})
    }

    purchaseHandler=()=>{
        this.setState({purchasing: true})
    }

    purchaseCanceledHandler=()=>{
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler=()=>{
        //alert("you continued")

        const queryParam=[]
        for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
            queryParam.push('price=' + this.state.burgerPrice)
        }
        const queryString=queryParam.join('&')
        this.props.history.push({
           pathname: '/checkout',
            search: '?'+queryString
        })
    }


    addIngredientHandler = (key)=> {
        const updatedIngredientCount = this.state.ingredients[key] + 1
        const updatedPrice = this.state.burgerPrice + INGREDIENT_PRICES[key]
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[key] = updatedIngredientCount
        this.setState({burgerPrice: updatedPrice, ingredients: updatedIngredients})
        this.updatePurchasable(updatedIngredients)
    }

    removeIngredientHandler = (key) => {
        let updatedIngredientCount=this.state.ingredients[key],
              updatedPrice=this.state.burgerPrice
        if(this.state.ingredients[key]>0){
            updatedIngredientCount = this.state.ingredients[key]-1
        }
        if(this.state.burgerPrice>4){
            updatedPrice = this.state.burgerPrice - INGREDIENT_PRICES[key]
        }
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[key] = updatedIngredientCount
        this.setState({burgerPrice: updatedPrice, ingredients:updatedIngredients})
        this.updatePurchasable(updatedIngredients)
    }

    render(){
        const disabledInfo ={...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let orderSummery = null
        let burger = this.state.error?<p>Can not load this page</p>:<Spinner/>

        if(this.state.ingredients){
            burger = <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                    addIngredients={this.addIngredientHandler}
                    removeIngredients={this.removeIngredientHandler}
                    disable={disabledInfo}
                    price={this.state.burgerPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummery = <OrderSummery
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                price={this.state.burgerPrice}
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

export default withErrorHandler(BurgerBuilder,axios)