import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'},
    { label: 'Chicken', type:'chicken'}
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price: <strong>{props.price}</strong></p>
        {controls.map(control => 
            <BuildControl 
                key = {control.label} 
                label = {control.label} 
                add = {() => props.addIngredient(control.type)}
                remove = {() => props.removeIngredient(control.type)}
                disable = {props.disable[control.type]}
            />
        )}
        <button 
            onClick = {props.ordered}
            className = {classes.OrderButton} 
            disabled = {!props.purchaseable}>{props.isAuthenticated ? 'Order Now' : 'Sign in to continue'}</button>
    </div>   
)

export default buildControls;