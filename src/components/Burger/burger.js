import React from 'react';

import classes from './burger.css';
import BurgerIngridient from './burger-ingridient';

const Burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />
      });
    });
  return (
    <div className={classes.Burger}> 
      <BurgerIngridient type="bread-top" />
      {transformedIngredients}
      <BurgerIngridient type="bread-bottom" />
    </div>
  );
};

export default Burger;