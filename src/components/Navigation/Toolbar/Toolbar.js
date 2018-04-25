import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Hamburger from '../../UI/Hamburger/Hamburger'
const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div className={classes.Menu} onClick={props.opened}><Hamburger/></div>
            <div className={classes.Logo}>
             <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    )
}

export default toolbar