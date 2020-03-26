import React from 'react';

import classes from './burger.css';
import BurgerIngridient from './burger-ingridient';

const Burger = (props) => {
  return (
    <div className={classes.Burger}> 
      <BurgerIngridient type="bread-top" />
      <BurgerIngridient type="cheese" />
      <BurgerIngridient type="meat" />
      <BurgerIngridient type="bread-bottom" />
    </div>
  );
};

export default Burger;