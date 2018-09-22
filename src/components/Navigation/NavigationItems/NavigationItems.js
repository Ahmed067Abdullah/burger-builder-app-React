import React from 'react';
import NavigatonItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigatonItem link = "/" exact>Burger Builder</NavigatonItem>
        <NavigatonItem link = "/orders">Orders</NavigatonItem>
    </ul>
);

export default navigationItems;