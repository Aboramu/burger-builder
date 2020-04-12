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

export const logout = () => {
  // удаляем token и expirationTime из localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  //
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// при получении улюча запускаем таймер, по истечении которого
// logout
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        // сохраняем "сессию" пользователя в localStorage
        const expirationDate = new Date( new Date().getTime() + res.data.expiresIn * 1000); // окончание времени жизни токена
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        //
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

// проверяем был ли алогинен user при перезагрузке или старте app
export const authCheckState = () => {
  return dispatch => {
    // получаем токен
    const token = localStorage.getItem('token');
    // если token === null, то отправляем action logout
    if(!token) {
      dispatch(logout());
    } else {
      // иначе получаем дату истечения жизни токена
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      // если время еще не истекло
      if( expirationDate >= new Date()){
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
      } else {
        dispatch(logout());
      }
    }
  };
};