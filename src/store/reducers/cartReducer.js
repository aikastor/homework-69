import {
  ADD_ITEM, INIT_CART,
  ORDER_FAILURE,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  REMOVE_ITEM
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  totalPrice: 150,
  ordering: false,
  error: null,
};

const cartReducer = (state = initialState, action)=> {

  const addItem = (item)=> {

    const curState = [...state.orders];
    let index = curState.findIndex(i => i.name === item.name);

    if (index === -1) {
      curState.push(item)
    } else  {
      let itemToChange = curState[index];

      itemToChange.qnt ++;
      itemToChange.totalPrice += item.price;
    }
    return {
      ...state,
      orders:  curState,
      totalPrice: state.totalPrice + item.price,
    }
  };

  switch (action.type) {
    case ADD_ITEM:
      return addItem(action.item);
    case REMOVE_ITEM:
      return {
        ...state,
        orders: [...state.orders].filter(i=> i.name !== action.item),
        totalPrice: state.totalPrice - action.price
      };
    case ORDER_REQUEST:
      return {...state, ordering: true};
    case ORDER_SUCCESS:
      return {...state, ordering: false, error: null};
    case ORDER_FAILURE:
      return {...state, ordering: false, error: action.error};
    case INIT_CART:
      return {...state, orders: [], totalPrice: 150};
    default:
      return state
  }
};
export default cartReducer;