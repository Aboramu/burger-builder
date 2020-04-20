import { put } from 'redux-saga/effects'; // put - отправляет action, для которого создана сага

import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action) {
  // удаляем token и expirationTime из localStorage
  // yield означает что движок будет ждать выполнения операции
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put({
    type: actionTypes.AUTH_LOGOUT
  });
}