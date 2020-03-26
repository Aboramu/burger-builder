import React from 'react';

import classes from './build-control.css';

const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.leabel}</div>
    <buttons className={classes.Less}>Less</buttons>
    <button className={classes.More}>More</button>
  </div>
);

export default BuildControl;