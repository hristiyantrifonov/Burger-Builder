import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import  { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/*We need to pass the ingredients between pages and we use render instead of component*/}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients //ingredients is the name as we named it in the reducer
    }
};

//NOTE: if we only needed to use mapDispatchToProps
// in the connect module we call connect (null, mapDispatchToProps) ...
// this is because the first argument is always stateToProps and is needed

export default connect (mapStateToProps) (Checkout);