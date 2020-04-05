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
        value: '',
        valueType: 'delivery method'
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
    // что бы Invalid применядлся только когда 
    updatedFormElement.touched = true;
    updateOrderForm[inputId] = updatedFormElement;
    console.log(updatedFormElement)
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
        {formElementArray.map(formElement => {
        console.log(formElement)
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
        )})}
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