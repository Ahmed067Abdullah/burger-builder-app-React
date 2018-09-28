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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // purchaseable : false,
    state = {
        purchasing : false,
        loading : false,
        error : false
    }

    // componentDidMount (){
    //     axios.get('/ingredients.json')
    //         .then(respone => {
    //             this.setState({ ingredients : respone.data});
    //         })
    //         .catch(err =>{
    //             this.setState({error : true})
    //         })
    // }

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
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
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

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (igName) => dispatch({type : actionTypes.ADD_INGREDIENT, ingredientName : igName}),
        onIngredientRemoved : (igName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName : igName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));