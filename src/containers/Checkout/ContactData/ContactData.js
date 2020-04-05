import React, { Component } from 'react';

import Button from '../../../components/UI/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input';
import classes from './ContactData.css';

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
        validation: {
          requered: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'  
        },
        value: '',
        validation: {
          requered: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'  
        },
        value: '',
        validation: {
          requered: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'  
        },
        value: '',
        validation: {
          requered: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'  
        },
        value: '',
        validation: {
          requered: true
        },
        valid: false
      },     
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();  // отменяем rerender
    // при клике continue в Modal показываем спинер
    this.setState({loading: true});
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    // dummy order
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trum() !== '' && isValid;
    };

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    // копируем orders из state
    const updateOrderForm = {
      ...this.state.orderForm
    };
    // копируем вложенный массив, можно исползовать  updateOrderForm[inputId].value = event.target.value;
    const updatedFormElement = { 
      ...updateOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updateOrderForm[inputId] = updatedFormElement;
    
    this.setState({orderForm: updateOrderForm});
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
        {formElementArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );

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