import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT:
            return{ //purchased refreshed everytime we visit the checkout container
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder), //concat is immutable
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        // Important as we are combining states and default case is vital if
        // we are handling the functionality in a different reducer
        default:
            return state;
    }
};

export default reducer;