import {ADD_ITEM} from "../actions/actionTypes";

const initialState = {
  orders: {},
  totalPrice: 0,
};

const cartReducer = (state = initialState, action)=> {

  const searchForItem = (item)=> {
    const curState = {...state.orders};
    const itemToSearch = Object.keys(item)[0];

    if (!curState.hasOwnProperty(itemToSearch)) {
      return {...state.orders, ...item};
    } else {
      return {...state.orders, itemToSearch: ''}
    }
  };

  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        orders: {...state.orders, ...action.item}
      };
    default:
      return state
  }
};
export default cartReducer;