import React, { Component } from 'react';

import Aux from '../../hoc';
import Burger from '../../components/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;