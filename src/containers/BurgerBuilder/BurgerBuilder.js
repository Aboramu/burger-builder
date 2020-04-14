import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'; 

import { withErrorHandler } from '../../hoc';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';
// добавляем export что бы компонент был доступен для тестов
// без обертки redux
export class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

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
    // если false то отправляем /auth
    if(this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
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
    let burger = !this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />; 

    if(this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={deisabledInfo}
            price={this.props.price}
            isAuth={this.props.isAuth}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler} />
        </Fragment>
      );
      orderSummary = 
        <OrderSummary 
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price} />;
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}  >
            {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const macStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(macStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));