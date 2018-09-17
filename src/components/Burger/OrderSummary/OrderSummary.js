import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    //A modal holding the order summary
    
    //Transform into array of keys (salad, bacon etc.)
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>
        });

    return (
      <Aux>
          <h3>Your Order</h3>
          <p>Delicious burger with following ingredients:</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
          <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
};

export default orderSummary;