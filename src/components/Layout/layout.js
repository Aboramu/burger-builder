import React from 'react';

import Aux from '../../hoc';
import classes from './layout.css';
import Toolbar from '../navigation/toolbar';
import SideDrawer from '../navigation/SideDrawer';

const Layout = (props) => {
  return(
    <Aux>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux> 
  );
};

export default Layout;