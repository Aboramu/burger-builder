import React, { Component } from 'react';

import { Aux, withErrorHandler } from '../../hoc';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // получаем список ингридиентов и добавляем в state
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        });
      })
      .catch(error => {
        this.setState({erroor: true})
      });
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
      this.setState({purchaseable: sum > 0})
  }

  addIngredientHandler = (type) => {
    // добавляет ингридиент, функция принимает на вход название ингридиента
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    // компируем массив ингридиентов из стейта
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // в полученном массиве изменяем значение количества ингридента на обновленное
    updatedIngredients[type] = updatedCount;
    // добавляем цену ингридиента к общей цене
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    // убирает ингридиент
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    // устанавливаем доступность заказа
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    // если  true то рендерим Modal
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // при клике continue в Modal показываем спинер
    // this.setState({loading: true});
    // dummy order
    // const order = {
    //   igredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Artem Tarasov',
    //     addres: {
    //       street: 'TestStreet 1',
    //       zipCode: '352352',
    //       country: 'Russia'
    //     },
    //     email: 'test@test.com'      
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // // отправляем запрос на сервер
    // axios.post('/orders.json', order)
    //   .then(res => {
    //     // убирам Spinner и закрываем Modal
    //     this.setState({ 
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({ 
    //       loading: false,
    //       purchasing: false
    //     });
    //   }) ;
    const queryParams = [];

    // для каждого i в state.ingredients создаем элемент вида bacon=1 в массиве queryParams ()
    // т.е заменяем имя ключа и его значение символами из utf-8
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    };
    
    const queryString = queryParams.join('&'); // создаем строку запроса

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render() {
    const deisabledInfo = {
      ...this.state.ingredients
    }

    // для каждого ингридиента устанавливаем true или false для кнопки less
    // если количество 0 или меньше, то кнопка недоступна
    for(let key in deisabledInfo) {
      deisabledInfo[key] = deisabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = !this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />; 

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={deisabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummary = 
        <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);