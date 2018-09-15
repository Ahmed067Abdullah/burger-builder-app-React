import React from 'react';
import NavigatonItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigatonItem link = "/" active>Burger Builder</NavigatonItem>
        <NavigatonItem link = "/">Checkout</NavigatonItem>
    </ul>
);

export default navigationItems;