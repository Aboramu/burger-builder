import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject } from '../../../shared/utitlity';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'  
        },
        value: '',
        valueType: 'name',
        validation: {
          requered: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'  
        },
        value: '',
        valueType: 'street',
        validation: {
          requered: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'  
        },
        value: '',
        valueType: 'zip code',
        validation: {
          requered: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'  
        },
        value: '',
        valueType: 'country',
        validation: {
          requered: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'  
        },
        value: '',
        valueType: 'e-mail',
        validation: {
          requered: true
        },
        valid: false,
        touched: false
      },     
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
        valueType: 'delivery method'
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();  // отменяем rerender
   
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    // вызываем action
    this.props.onOrderBurger(order, this.props.token);
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if(rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if(rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    // копируем вложенный массив, можно исползовать  updateOrderForm[inputId].value = event.target.value;
    const updatedFormElement = updateObject(
      this.state.orderForm[inputId], {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.orderForm[inputId].validation),
        touched: true
      }
    );

    const updateOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement
    });
 
    // проверяем valid формы
    let formIsValid = true;
    for (let inputId in updateOrderForm) {
      formIsValid = updateOrderForm[inputId].valid && formIsValid;
    }

    this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => {
          return  (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} 
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valuetype={formElement.config.valueType} />
          )}
        )}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        
      </form>
    );

    if (this.props.loading) {
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
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);