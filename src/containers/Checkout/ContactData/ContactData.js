import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,   //!!! If this goes into real app - this price should be calculated in the server to avoid manipulation
            customer: {
                name: 'Hris Trifonov',
                address: {
                    street: 'Teststreet 1',
                    zipCode: 'SU123VD',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fast'
        }

        //Creates the orders node(table) in Firebase
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                // this only works after we pass the props from the checkout
                // we have done so in the render method via {...props}
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {

        let form =(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;