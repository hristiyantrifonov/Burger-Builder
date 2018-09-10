import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //Map the object into array of ingredients
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => { //igKey is salad, bacon etc. // i is 1,2,3 etc.
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>;
            })
        }) // Array of array up to here
        .reduce((arr,element) => {
            return arr.concat(element)
        }, []); // either array or the elements

   if (transformedIngredients.length === 0){
       transformedIngredients = <p>Please start adding ingredients!</p>
   }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;