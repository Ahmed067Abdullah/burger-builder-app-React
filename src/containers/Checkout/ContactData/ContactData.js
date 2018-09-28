import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; 
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    
    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Enter Your Name',
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 3,
                    maxLength : 5 
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Enter Your Email',
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false

            },
            address : {
                elementType : 'textarea',
                elementConfig : {
                    placeholder : 'Enter Your Address'
                },
                value : '',
                validation : {
                    required : true,                    
                    minLength : 10,
                    maxLength : 50
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    option : [
                        {value : 'fastest', displayVal : 'Fastest'},
                        {value : 'cheapest', displayVal : 'Cheapest'}
                    ]
                },
                validation : {},
                valid : true,
                value : 'fastest'
            } ,
        },
        loading : false,
        formIsValid : false
    }

    checkValidity (value, rules) {
        let isValid = true;
        
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading : true});

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        } 

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : formData
        }
        axios.post('/orders.json', order)
            .then(res => { 
                this.setState({ loading : false});
                this.props.history.push('/');
            })
            .catch(err => { this.setState({ loading : false}); })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }
    
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({id: key, config : this.state.orderForm[key]});
        }
        let form = <Spinner/>;
        if(!this.state.loading){
            form = (
                <Aux>
                    <h4>Enter your contact details</h4>
                    <form onSubmit =  {this.orderHandler}>
                        {formElementsArray.map( formElement => {
                            return <Input
                                key = {formElement.id} 
                                elementType = {formElement.config.elementType} 
                                elementConfig = {formElement.config.elementConfig}
                                value = {formElement.config.value}
                                invalid = {!formElement.config.valid}
                                shouldValidate = {formElement.config.validation}
                                touched = {formElement.config.touched}
                                changed = {(event) => this.inputChangedHandler(event,formElement.id)}/>
                        })}
                        <Button btnType = "Success" disabled = {!this.state.formIsValid}>Order</Button>
                    </form>
                </Aux>    
            );
        }

    return(
        <div className = {classes.ContactData}>
            {form}
        </div>
      )  
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));