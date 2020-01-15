import {ADD_ITEM, REMOVE_ITEM} from "../actions/actionTypes";

const initialState = {
  orders: [],
  totalPrice: 150,
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
    default:
      return state
  }
};
export default cartReducer;