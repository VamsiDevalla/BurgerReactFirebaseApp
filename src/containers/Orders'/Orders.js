import React,{Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'
import * as actions from '../../Store/actions/index'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token)
    }
    render(){
        let orders = <Spinner/>
        if(!this.props.loading) {
            if (!this.props.orders.length) {
                orders = <h1 style={{textAlign: 'center', marginTop: '20%'}}>You haven't placed any orders yet</h1>
            }
            else {
                orders = this.props.orders.map(order => {
                    return <Order key={order.id} delivery={order.deliveryMethod} price={order.price}
                                  ingredients={order.ingredients}/>
                })
            }
        }


        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        orders: state.ord.orders,
        loading: state.ord.loading,
        token: state.auth.token
    }
}
const mapDispatchToProps= dispatch => {
    return{
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))