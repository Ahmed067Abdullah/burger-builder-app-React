import React , {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


//Stateless Component
// const orderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredients)
//         .map((igKey) => {
//             return <li key = {igKey} ><span style = { {textTransform : 'capitalize'} }>{igKey}</span> : {props.ingredients[igKey]}</li>
//         });
//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A Delicios Burger With The Following Ingredients</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Price : {props.price}</strong> </p>
//             <p>Continue to Checkout?</p>  
//             <Button btnType = "Danger" clicked = {props.cancelOrder}>CANCEL</Button>
//             <Button btnType = "Success" clicked = {props.confirmOrder}>CONTINUE</Button>              
//         </Aux> 
//     );
// }

// export default orderSummary;


//Statefull Component
class OrderSummary extends Component {

    componentWillUpdate(){
        console.log("[OrderSummary] WillUpdate");
        console.log(this.props.ingredients)
    }

    render(){
        const ingredients = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key = {igKey}>
                        <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: 
                        {this.props.ingredients[igKey]}
                    </li>
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicios Burger With Following Ingredients</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Price: {this.props.price}</strong></p>
                <p>Want to Checkout?!</p>
                <Button btnType = "Danger" clicked = {this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType = "Success" clicked = {this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
}


export default OrderSummary;