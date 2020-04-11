import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const auth = (email, pass) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzH3s5WmmgfiSpdZfgXtLZtGAiF2pOpM4', authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
}