import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // 1) `Object.keys()` returns all the keys of the passed object in array form 
    // 2) `[...Array(props.ingredients[igKey])]`: the array returned from Object.keys() executes map func and for each key(ingredient) 
    //                                            we make a new array of length equal to the amount of that ingredient by using 
    //                                            props.ingredients[igKey]
    // 3)  the array created by Array(props.ingredients[igKey]) executes map on each of its blocks and for eah of them, it creates a 
    //     BurgerIngredient component of the type given by igKey, `igKey + i` gives the unique id for each BurgerIngredient component
    // 4) reduce method takes 2 args, previous value and the current value

    let transformedIngredients = Object.keys(props.ingredients)               // 1
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {          // 2
                return <BurgerIngredient key = {igKey + i} type = {igKey} />;   // 3
            });          
        }).reduce((arr,el) =>{                                                  // 4
            return arr.concat(el);
        },[]);
    
    if(transformedIngredients.length === 0)
        transformedIngredients = <p>Please Start Adding Ingredients</p>
        console.log(transformedIngredients)
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    )
}   

export default burger;