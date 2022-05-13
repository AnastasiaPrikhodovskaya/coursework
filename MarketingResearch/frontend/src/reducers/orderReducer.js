const SET_ORDERS = 'SET_ORDERS';

const defaultState = {
  orders: [],
};

export default function orderReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action?.payload,
      };
    default:
      return state;
  }
}

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});
