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
        let summery = <Redirect to='/'/>
        if(this.props.ings){
            summery=(<CheckOutSummery
                ingredients={this.props.ings}
                onCheckoutCanceled={this.checkoutCanceledHandler}
                onCheckoutContinued={this.checkoutContinuedHandler}
            />)
        }
        return(
            <div>
                {summery}
                <Route path={this.props.match.path+'/contact-data'}
                       component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps,)(CheckOut);