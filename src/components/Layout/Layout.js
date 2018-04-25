import React,{Component} from 'react'
import  Aux from  '../../HOC/Auxilary'
import  Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    slideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer: false})
    }
    slideDrawerOpenedHandler = ()=>{
        this.setState({showSideDrawer:true})
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth = {this.props.isAuthenticated}
                    opened={this.slideDrawerOpenedHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.slideDrawerClosedHandler}
                />
                <main className={Classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)