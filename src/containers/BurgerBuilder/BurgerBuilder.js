import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { Aux, withErrorHandler } from '../../hoc';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount() {
    // получаем список ингридиентов и добавляем в state
    // axios.get('/ingredients.json')
    //   .then(res => {
    //     this.setState({
    //       ingredients: res.data
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({erroor: true})
    //   });
  // }

  updatePurchaseState = (ingredients) => {
      // создаем массив с ключами объекта (keys), заменяем ключи в массиве
      // на значения из объекта (map) и возвращаем сумму этих значений (reduce)
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      // если значение больше нуля, то устанавливаем purchaseable в true. 
      // влияет на доступность заказа в BuildControls
      return sum > 0;
  }

  purchaseHandler = () => {
    // если  true то рендерим Modal
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  } 

  render() {
    const deisabledInfo = {
      ...this.props.ings
    }
    // для каждого ингридиента устанавливаем true или false для кнопки less
    // если количество 0 или меньше, то кнопка недоступна
    for(let key in deisabledInfo) {
      deisabledInfo[key] = deisabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = !this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />; 

    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={deisabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummary = 
        <OrderSummary 
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price} />;
    }

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}  >
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const macStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT, 
      ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionTypes.RENOVE_INGREDIENT, 
      ingredientName: ingredientName
    })
  }
}

export default connect(macStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));