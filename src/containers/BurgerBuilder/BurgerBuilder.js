import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 30,
    meat : 70,
    chicken : 60,
    cheese : 40 
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice : 40,
        purchaseable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount (){
        axios.get('/ingredients.json')
            .then(respone => {
                this.setState({ ingredients : respone.data});
            })
            .catch(err =>{
                this.setState({error : true})
            })
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
        this.setState({ loading : true});
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
            .then(res => { this.setState({ loading : false, purchasing : false}); })
            .catch(err => { this.setState({ loading : false, purchasing : false}); })


    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            )
            
            orderSummary = (
                <OrderSummary 
                    ingredients = {this.state.ingredients}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice}/>
            )
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);