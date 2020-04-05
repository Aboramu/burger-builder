import React, { Component } from 'react';

import Order from '../../components/Order';
import axios from '../../axios-orders';
import { withErrorHandler } from '../../hoc';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    // получаем из firebase все записи и преобразует обект, 
    // в массив объектов 
    axios.get('/orders.json')
      .then(res => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchOrders});
        console.log(this.state.orders)
      })
      .catch(err => {
        this.setState({loading: false})
      })
  }

  render() {
    return(
      <div>
        {this.state.orders.map( order => (
          <Order 
            key={order.id}
            ingredients={order.igredients}
            price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);