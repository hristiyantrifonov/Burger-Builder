import React from 'react';

import Aux from '../../../hoc/Auxiliary';

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
          <p>Continue to checkout?</p>
      </Aux>
    );
};

export default orderSummary;