import {ADD_ITEM} from "../actions/actionTypes";

const initialState = {
  orders: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action)=> {

  const searchForItem = (item)=> {
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
      return searchForItem(action.item);

    default:
      return state
  }
};
export default cartReducer;