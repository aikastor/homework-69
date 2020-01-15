import {ADD_ITEM, REMOVE_ITEM} from "./actionTypes";

export const addItem = (item)=> ({type: ADD_ITEM, item});
export const removeItem =(item, price)=>({type: REMOVE_ITEM, item, price});