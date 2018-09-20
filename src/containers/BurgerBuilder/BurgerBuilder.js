import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad : 30,
    meat : 70,
    chicken : 60,
    cheese : 40 
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            chicken : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 40,
        purchaseable : false,
        purchasing : false
    }

    addIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type]++;
        const currentTotal = this.state.totalPrice;
        const newTotal = currentTotal + INGREDIENT_PRICES[type];
        this.setState({
                ingredients,
                totalPrice : newTotal
            });
            this.updatePurchaseState(newTotal,ingredients);
    }
    removeIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        if(ingredients[type] <= 0){
            return 
        }
        ingredients[type]--;
        const currentTotal = this.state.totalPrice;
        const newTotal = currentTotal - INGREDIENT_PRICES[type];
        this.setState({
            ingredients,
            totalPrice : newTotal
        });
        this.updatePurchaseState(newTotal,ingredients);
    }

    updatePurchaseState = (total,ingredients) =>{
            // Technique no 1
            this.setState({ purchaseable : total > 40 });

            // Technique no 2
            // const sum = Object.keys(ingredients)
            //     .map( igKey => {
            //         return ingredients[igKey]
            //     })
            //     .reduce((sum,val) => {
            //         return sum +=val;
            //     },0);
            //     this.setState({purchaseable : sum > 0})
    }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        console.log("pucrafad")
        const order = {
            ingredients : this.state.ingredients,
            total : this.state.totalPrice,
            cutomer : {
                name : "Ahmed Abdullah",
                address : "ABC Street"
            },
            email : "ahmed@gmail.com",
            deliveryMethod : 'Fastest'
        }
        axios.post('/order.json',order)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })


    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        purchaseCanceled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    price = {this.state.totalPrice}
                    addIngredient = {this.addIngredientHandler}
                    removeIngredient = {this.removeIngredientHandler}
                    disable = {disabledInfo}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;