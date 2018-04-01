import React,{Component} from 'react'
import CheckOutSummery from '../../components/CheckOutSummry/CheckOutSummry'
import ContactData from './ContactData/ContactData'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class CheckOut extends Component{
    checkoutCanceledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let summary = <Redirect to='/'/>
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased? <Redirect to='/'/> : null
            summary=(
                <div>
                    {purchaseRedirect}
                    <CheckOutSummery
                        ingredients={this.props.ings}
                        onCheckoutCanceled={this.checkoutCanceledHandler}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path+'/contact-data'}
                           component={ContactData}
                    />
                </div>

                )
        }
        return summary
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.ord.purchased
    }
}



export default connect(mapStateToProps)(CheckOut);