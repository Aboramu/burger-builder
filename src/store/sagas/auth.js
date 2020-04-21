import { delay } from 'redux-saga/effects'; // функция helper, задерживает выполенение следующего шага 
import { put } from 'redux-saga/effects'; // put - отправляет action, для которого создана сага
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  // удаляем token и expirationTime из localStorage
  // yield означает что движок будет ждать выполнения операции
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  // задерживаем время выполнения действия на время жизни ключа
  // с помощью функции delay 
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout()); 
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.pass,
    returnSecureToken: true
  };
  // set default url 
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzH3s5WmmgfiSpdZfgXtLZtGAiF2pOpM4';
  if(!action.isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzH3s5WmmgfiSpdZfgXtLZtGAiF2pOpM4'; 
  
  // выполняем запрос в try, если не удачно, то ловим error в catch
  try {
    const res = yield axios.post(url, authData)
      // сохраняем "сессию" пользователя в localStorage
  const expirationDate = yield new Date( new Date().getTime() + res.data.expiresIn * 1000); // окончание времени жизни токена
  yield localStorage.setItem('token', res.data.idToken);
  yield localStorage.setItem('expirationDate', expirationDate);
  yield localStorage.setItem('userId', res.data.localId);
  //
  yield put(actions.authSuccess(res.data.idToken, res.data.localId));
  yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }  
}

// проверяем был ли алогинен user при перезагрузке или старте app
export function* authCheckStateSaga(action) {
  // получаем токен
  const token = yield localStorage.getItem('token');
  // если token === null, то отправляем action logout
  if(!token) {
    yield put(actions.logout());
  } else {
    // иначе получаем дату истечения жизни токена
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    // если время еще не истекло
    if( expirationDate >= new Date()){
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
    } else {
      yield put(actions.logout());
    }
  }
}