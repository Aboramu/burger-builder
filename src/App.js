import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from './hoc';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup();
  }

  render() {
    return (
      <div >
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
