import React,{Component} from 'react'
import CheckOutSummery from '../../components/CheckOutSummry/CheckOutSummry'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
class CheckOut extends Component{
    state={
        ingredients:null,
        price:0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search),
              ingredients = {}
         let price = 0
        for(let param of query){
            if(param[0]==='price'){
                price = param[1]
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients,price:price})
    }
    checkoutCanceledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <CheckOutSummery
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.checkoutCanceledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path+'/contact-data'}
                    render={(props)=>(
                        <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>
                    )}
                />
            </div>
        )
    }
}

export default CheckOut;