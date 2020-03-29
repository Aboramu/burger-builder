import React from 'react';

import classes from './toolbar.css';
import Logo from '../../logo';
import NavigationItems from '../NavigationItems';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;