import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import { Layout } from './hoc';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter>
          <Layout>
            <Route path='/burger-builder' component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Redirect from='/' to='/burger-builder' />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
