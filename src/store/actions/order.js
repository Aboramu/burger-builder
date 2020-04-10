import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// sync action
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (err) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

// async action
export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    // отправляем запрос на сервер
    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail( err ));
      });
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // получаем из firebase все записи и преобразует обект, 
    // в массив объектов 
    axios.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
  };
}


