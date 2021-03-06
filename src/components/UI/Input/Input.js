import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input 
                                className = {inputClasses.join(' ')} 
                                value = {props.value}
                                {...props.elementConfig} 
                                onChange = {props.changed} />
            break;
        case('textarea'):
            inputElement = <textarea 
                                className = {inputClasses.join(' ')} 
                                value = {props.value}
                                {...props.elementConfig} 
                                onChange = {props.changed} />
            break;
        case('select'):
            inputElement = (
                <select
                    className = {classes.InputElement}
                    value = {props.value}
                    onChange = {props.changed}>
                    {props.elementConfig.option.map( option => {
                        return <option 
                                    value = {option.value}
                                    key = {option.value} >
                                    {option.displayVal}
                                </option>;   
                    })}
                </select>
            )
            break;
        default:
            inputElement = <input 
                                className = {classes.InputElement}
                                value = {props.value} 
                                onChange = {props.changed}
                                {...props.elementConfig} />
            
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;