import { put } from 'redux-saga/effects'; 
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
  // получаем список ингридиентов asyn и вызываем action setIngedients
  try {
    const res = yield axios.get('/ingredients.json');
    yield put(actions.setIngedients(res.data));
  } catch (err) {
    put(actions.fetchIngredientsFailed());
  }
}