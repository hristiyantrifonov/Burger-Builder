import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    //JS object to represent our form - aka the configuration object
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,   //!!! If this goes into deployed real app - this price should be calculated in the server to avoid manipulation
            orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }

        // Fixing common validation gotcha
        // Now all rules need to resolve to true not just one
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    //Two-way binding so that when we type into the input elements the state updates
    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value, inputIdentifier);

        // doing just ...this.state.orderForm would not deeply copy the object
        // this is the case because it is not one level deep, it has multiple
        // nested elements and this means that the pointers to them would be copied
        // and we will still change the state mutably

        // this is clone of the original object
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        // then we take care of the nested object
        // now we can safely change data in the value
        // if we were to change something in elementConfig - we need
        // another clone as it is still not copied.
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);

        let formValidity = true;
        for(let inputIdentifier in updatedOrderForm){
            formValidity = updatedOrderForm[inputIdentifier].valid && formValidity;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formValidity});
    }

    render () {

        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form =(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
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

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect (mapStateToProps)(ContactData);