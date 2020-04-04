import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    // возвращаем массив, содержащий для каждого ключа массив [ключ, значение]
    // и добавляем эти значения в массив ingredients
    for (let param of query.entries()) {
      // ['salad', '1' ]
      ingredients[ param[0] ] = +param[1];
    }

    this.setState({
      ingredients: ingredients
    });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack(); 
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary  
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    )
  }
}

export default Checkout;