import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; 

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class ContactData extends Component{
    
    state = {
        name : '',
        email : '',
        address : '',
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading : true});
        const order = {
            ingredients : this.props.ingredients,
            cutomer : {
                name : "Ahmed Abdullah",
                address : "ABC Street"
            },
            email : "ahmed@gmail.com",
            deliveryMethod : 'Fastest',
            price : this.props.price
        }
        console.log(order);
        axios.post('/orders.json',order)
            .then(res => { 
                this.setState({ loading : false});
                this.props.history.push('/');
            })
            .catch(err => { this.setState({ loading : false}); })
    }
    
    render(){
        let form = <Spinner/>;
        if(!this.state.loading){
            form = (
                <Aux>
                    <h4>Enter your contact details</h4>
                    <form>
                        <input className = {classes.Input} type = "text" name = "name" placeholder = "Enter name"/>
                        <input className = {classes.Input} type = "text" name = "email" placeholder = "Enter email"/>
                        <input className = {classes.Input} type = "text" name = "address" placeholder = "Enter address"/>
                        <Button className = {classes.Input} btnType = "Success" clicked = {this.orderHandler}>Order</Button>
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

export default withRouter(ContactData);