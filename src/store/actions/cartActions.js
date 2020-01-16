import {
  ADD_ITEM,
  INIT_CART,
  ORDER_FAILURE,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  REMOVE_ITEM
} from "./actionTypes";
import axiosMenu from "../../axiosMenu";

export const addItem = (item)=> ({type: ADD_ITEM, item});
export const removeItem =(item, price)=>({type: REMOVE_ITEM, item, price});

export const orderRequest = () => ({type: ORDER_REQUEST});
export const orderSuccess = () => ({type: ORDER_SUCCESS});
export const orderFailure = (error) => ({type: ORDER_FAILURE, error});


export const initCart = ()=> ({type: INIT_CART});

export const createOrder = order => {
  return async (dispatch) => {
    try {
      dispatch (orderRequest());
      await axiosMenu.post('cafeOrders.json', order);
      dispatch(orderSuccess());
    } catch (e) {
      dispatch(orderFailure(e))
    }
  }
};

