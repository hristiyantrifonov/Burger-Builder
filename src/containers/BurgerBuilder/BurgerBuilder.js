import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";

class BurgerBuilder extends Component{
    state = {
        // ingredients: null,   ---- we now use ings from Redux's mapStateToProps
        // totalPrice: 4,       ---- we now use price from Redux's mapStateToProps
        // purchasable: false,
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    // Local UI (self judged) so it is better to be managed here instead of in the burgerBuilder
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
               return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
    }

    // Triggered when we click "Order Now" button
    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else {
            this.props.onSetAuthRedirectPath('/checkout');
            // This is coming from React router
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
       this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){

        const disabledInfo = {
            ...this.props.ings //Copying the ingredients object immutably
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //Make it in the format - {salad: true, meat: true}

        let orderSummary = null;

        //Default is the spinner
        //But if there was error display a message to indicate that it is unusable
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>

        //Because we fetch the ingredients from server the UI should wait for them
        //and update accordingly
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth = {this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    // !!! ingredients/totalPrice are the names as we named them in the burgerBuilder
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));