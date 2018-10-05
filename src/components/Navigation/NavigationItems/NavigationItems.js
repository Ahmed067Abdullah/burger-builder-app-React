import React from 'react';
import NavigatonItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigatonItem link = "/" exact>Burger Builder</NavigatonItem>
        {props.isAuthenticated ? <NavigatonItem link = "/orders">Orders</NavigatonItem> : null}
        {props.isAuthenticated ? 
               <NavigatonItem link = "/logout">Logout</NavigatonItem> :
               <NavigatonItem link = "/auth">Authenticate</NavigatonItem>}
    </ul>
);

export default navigationItems;