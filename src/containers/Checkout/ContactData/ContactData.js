import React, { Component } from 'react';

import Button from '../../../components/UI/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();  // отменяем rerender
    // при клике continue в Modal показываем спинер
    this.setState({loading: true});
    // dummy order
    const order = {
      igredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Artem Tarasov',
        addres: {
          street: 'TestStreet 1',
          zipCode: '352352',
          country: 'Russia'
        },
        email: 'test@test.com'      
      },
      deliveryMethod: 'fastest'
    };
    // отправляем запрос на сервер
    axios.post('/orders.json', order)
      .then(res => {
        // убирам Spinner и закрываем Modal
        this.setState({ 
          loading: false,
        });
        this.props.history.push('/'); // редирект после заказа
      })
      .catch(err => {
        this.setState({ 
          loading: false,
        });
      }) ;
  }

  render() {
    let form = (<form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
      <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;