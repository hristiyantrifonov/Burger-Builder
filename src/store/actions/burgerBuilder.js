// Outsourcing some of the functionality to be consistent with
// the overall design structure
import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

// Switching to action creators (in BurgerBuilder.js)
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientToChange: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientToChange: name
    };
};

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

// This is the synchronous code which I eventually
// want to dispatch once the async code is done
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    // this syntax available thanks to Redux Thunk
    return dispatch => {
        //Async code here...
        axios.get('https://myburger-221a9.firebaseio.com/ingredients.json')
            .then(response => {
                // this.setState({ingredients: response.data});
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                // this.setState({error: true});
                dispatch(fetchIngredientsFailed());
            });
    }
};