import React, { Component } from 'react'
import  Layout from  './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import {Route,Switch} from 'react-router-dom'
import Orders from "./containers/Orders'/Orders";
import Auth from './containers/Auth/Auth'

class App extends Component {
    render(){
        return(

                <Layout>
                    <Switch>
                        <Route path='/checkout' component={CheckOut}/>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/auth' component={Auth}/>
                        <Route path='/' component={BurgerBuilder}/>
                    </Switch>
                </Layout>

        )
    }
}


export default App


