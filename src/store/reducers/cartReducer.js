import {
  ADD_ITEM, DECREASE_ITEM_QNT, INCREASE_ITEM_QNT, INIT_CART,
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
  const curState = [...state.orders];

  const addItem = (item)=> {

    let index = curState.findIndex(i => i.name === item.name);

    if (index === -1) {
      curState.push(item)
    } else  {
      curState[index].qnt++;
      curState[index].totalPrice += item.price;
    }
    return {
      ...state,
      orders:  curState,
      totalPrice: state.totalPrice + item.price,
    }
  };

  const increaseQnt = (name, price)=> {
    let orderItem = curState.find(i=> i.name === name);
    orderItem.qnt ++;
    orderItem.totalPrice += price;

    return{
      ...state,
      orders: curState,
      totalPrice: state.totalPrice + price,
    }
  };

  const decreaseQnt =(name, price)=>{
    let orderItem = curState.find(i=> i.name === name);

    if (orderItem.qnt > 1) {
      orderItem.qnt --;
      orderItem.totalPrice -= price;

      return{
        ...state,
        orders: curState,
        totalPrice: state.totalPrice - price,
      }

    } else {
      return{
        ...state,
        orders: [...state.orders].filter(i=> i.name !== name),
        totalPrice: state.totalPrice - price,
      }
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
    case INCREASE_ITEM_QNT:
      return  increaseQnt(action.name, action.price);
    case DECREASE_ITEM_QNT:
      return  decreaseQnt(action.name, action.price);
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