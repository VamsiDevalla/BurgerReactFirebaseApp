import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'

class Orders extends Component{
    state = {
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                this.setState({orders:fetchedOrders,loading:false})
            })
            .catch(err =>{
                this.setState({loading:false})
            })
    }
    render(){
        let orders = null
        if(this.state.loading){
            orders=<Spinner/>
        }else if(!this.state.orders.length){
            orders=<h1 style={{textAlign:'center',marginTop:'20%'}}>You haven't placed any orders yet</h1>
        }
        else{
            orders= this.state.orders.map(order =>{
               return  <Order key={order.id} delivery={order.deliveryMethod} price={order.price} ingredients={order.ingredients}/>
            })
        }


        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios)