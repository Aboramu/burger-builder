import React, { Component } from 'react';

import Aux from '../../hoc';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/build-controls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Aux>
    );
  }
}

export default BurgerBuilder;