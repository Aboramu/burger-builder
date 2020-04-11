import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const auth = (email, pass, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true
    };
    // set default url 
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzH3s5WmmgfiSpdZfgXtLZtGAiF2pOpM4';
    if(!isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzH3s5WmmgfiSpdZfgXtLZtGAiF2pOpM4'; 
    
    axios.post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
}