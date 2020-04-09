import React, { Component, Fragment } from 'react';

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
          opened={this.sideDraweToggleHandler}/>
        <SideDrawer
          closed={this.sideDraweClosedHandler} 
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment> 
    );
  }
}

export default Layout;