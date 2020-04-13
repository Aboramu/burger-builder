import React, { Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from './hoc';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent';

// подготавливаем компоненты для async загрузки
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/logout' component={Logout} />
          <Redirect to='/' />
      </Switch>
      );
    }
    
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
