import { delay } from 'redux-saga'; // функция helper, задерживает выполенение следующего шага 
import { put } from 'redux-saga/effects'; // put - отправляет action, для которого создана сага

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
  yield put(actions.logout); 
}