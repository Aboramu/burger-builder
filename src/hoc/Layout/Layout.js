import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css'; // импортируем классы css
import Toolbar from '../../components/Navigation/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer';

class Layout extends Component {
  state ={
    showSideDrawer: false
  }

  sideDraweClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDraweToggleHandler = () => {
    // для работы с актуальным state в setState вызываем функцию, которая принимает текущ state и возвращает новый
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    return(
      <Fragment>
        <Toolbar 
          isAuth={this.props.isAuth}
          opened={this.sideDraweToggleHandler}/>
        <SideDrawer
          isAuth={this.props.isAuth}
          closed={this.sideDraweClosedHandler} 
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment> 
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);