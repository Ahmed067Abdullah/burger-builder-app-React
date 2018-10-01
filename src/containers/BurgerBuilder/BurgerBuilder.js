import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // purchaseable : false,
    state = {
        purchasing : false
    }

    componentDidMount (){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (total,ingredients) =>{
            // Technique no 1
            // this.setState({ purchaseable : total > 40 });

            // Technique no 2
            // const sum = Object.keys(ingredients)
            //     .map( igKey => {
            //         return ingredients[igKey]
            //     })
            //     .reduce((sum,val) => {
            //         return sum +=val;
            //     },0);
            //     this.setState({purchaseable : sum > 0})

            // after adding redux
            return total > 40;
    }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls 
                        price = {this.props.totalPrice}
                        addIngredient = {this.props.onIngredientAdded}
                        removeIngredient = {this.props.onIngredientRemoved}
                        disable = {disabledInfo}
                        purchaseable = {this.updatePurchaseState(this.props.totalPrice)}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            )
            
            orderSummary = (
                <OrderSummary 
                    ingredients = {this.props.ingredients}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.props.totalPrice}/>
            )
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

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved : (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));