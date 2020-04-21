import { takeEvery} from 'redux-saga/effects'; // слушает определенные action и затем выполняет определенные действия

import * as actionTypes from '../actions/actionTypes';
import { 
  logoutSaga, 
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'

// создаем новые генератор 
// takeEvery принимает имя дейсятвия и сагу, которую должен выполнить 
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga);
}