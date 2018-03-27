import React,{Component} from 'react'
import  Aux from  '../../HOC/Auxilary'
import  Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
                <Toolbar opened={this.slideDrawerOpenedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.slideDrawerClosedHandler}/>
                <main className={Classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout