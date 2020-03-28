import React from 'react';

import classes from './backdrop.css';

const Backdrop = (props) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default Backdrop;