import * as actionTypes from './actionTypes';


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
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}; 

// при получении улюча запускаем таймер, по истечении которого
// logout
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (email, pass, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    isSignup: isSignup,
    pass: pass
  };
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

// проверяем был ли алогинен user при перезагрузке или старте app
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};