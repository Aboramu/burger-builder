import React, { Component } from 'react';

import Aux from '../../hoc';
import classes from './layout.css';
import Toolbar from '../navigation/toolbar';
import SideDrawer from '../navigation/SideDrawer';

class Layout extends Component {
  state ={
    showSideDrawer: false
  }

  sideDraweClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDraweToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    return(
      <Aux>
        <Toolbar 
          opened={this.sideDraweToggleHandler}/>
        <SideDrawer
          closed={this.sideDraweClosedHandler} 
          open={this.state.showSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux> 
    );
  }
}

export default Layout;