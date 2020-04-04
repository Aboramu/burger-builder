import React, { Component } from 'react';

import Order from '../../components/Order';

class Orders extends Component {
  render() {
    return(
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;