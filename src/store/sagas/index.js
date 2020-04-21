import { takeEvery, all, takeLatest } from 'redux-saga/effects'; // слушает определенные action и затем выполняет определенные действия
// all - хелпер, принимает массив, элементами которого будут все takeEvery
// в наблюдателе
// takeLatest сбросить действующую сагу этого типа и использовать последнюю наступившую
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
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchBurgerBuilder() {
  yield all([
    takeLatest(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga)
  ]);
}