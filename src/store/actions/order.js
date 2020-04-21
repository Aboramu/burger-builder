import * as actionTypes from './actionTypes';

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
export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SAGA,
    orderData: orderData,
    token: token
  };   
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_SAGA,
    token: token,
    userId: userId
  }
}


