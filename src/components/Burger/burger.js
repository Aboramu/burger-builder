import React from 'react';
// для того что бы получить доступ к Router props)match, history) в любом компоненте
// import { withRouter } from 'react-router-dom'; // это hoc просто оборачиваем в него нужный компонент

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
  //console.log(props);
  // из ключей объекта props.ingredients создаем массив, вызываем map,
  // для каждого ингридиента возвращаем разряженный массив длинной props.ingredients[igKey],
  // с помощью spread оператора распределяем этот массив в новый, с неопределенными значениями
  // и вызываем map, который возвращает новый массив содержащий компоненты BurgerIngredient (map)
  // вызываем reduce со стартовым значеним [] и для каждого подмасива в transformedIngredients, вызываем
  // slice с [], в результате получаем одноуровневый массив содержащий компоненты BurgerIngredient 
  
  let transformedIngredients = Object.keys(props.ingredients) 
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => { 
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    }) 
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);   
    // console.log(transformedIngredients);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <div>Please start adding ingridients!</div>
  }


  return (
    <div className={classes.Burger}> 
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;