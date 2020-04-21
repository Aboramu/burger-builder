import { put } from 'redux-saga/effects'; 
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
    // отправляем запрос на сервер
  try {
    const res = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail( err ))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  // получаем из firebase все записи и преобразует обект, 
  // в массив объектов 
  try {
    const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    const res = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = yield []; 
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    };
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    put(actions.fetchOrdersFail(err));
  }
}