import React from 'react';

import Aux from '../../hoc';
import classes from './layout.css';

const Layout = (props) => {
  return(
    <Aux>
      <div>
        Toolbar, SideDrawer, Backdrop
      </div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux> 
  );
};

export default Layout;