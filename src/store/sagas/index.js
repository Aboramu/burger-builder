import { takeEvery} from 'redux-saga/effects'; // слушает определенные action и затем выполняет определенные действия

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

// создаем новые генератор 
// takeEvery принимает имя дейсятвия и сагу, которую должен выполнить 
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
