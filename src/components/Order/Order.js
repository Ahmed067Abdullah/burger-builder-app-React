import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let i in props.ingredients){
        ingredients.push({
            name : i,
            amount : props.ingredients[i]
        });
    }

    const outputIngredients = ingredients.map((ingredient) => {
        return <span
                    key = {ingredient.name}
                    style = {{
                        textTransform : 'capitalize',
                        display: 'inline-block',
                        margin : '0px 8px',
                        border : '1px solid #ccc',
                        padding : '5px'
                        }}
                >{ingredient.name} ({ingredient.amount})</span>
    })

    return (
        <div className = {classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}

export default order;