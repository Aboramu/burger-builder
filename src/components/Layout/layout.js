import React from 'react';

import Aux from '../../hoc';
import classes from './layout.css';
import Toolbar from '../navigation/toolbar';

const Layout = (props) => {
  return(
    <Aux>
      <Toolbar />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux> 
  );
};

export default Layout;