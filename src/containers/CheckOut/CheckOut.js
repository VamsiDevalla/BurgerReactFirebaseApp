import React,{Component} from 'react'
import CheckOutSummery from '../../components/CheckOutSummry/CheckOutSummry'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

class CheckOut extends Component{


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
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients
    }
}

export default connect(mapStateToProps,)(CheckOut);