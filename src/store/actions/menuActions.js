import {MENU_FAILURE, MENU_REQUEST, MENU_SUCCESS} from "./actionTypes";
import axiosMenu from "../../axiosMenu";

export const menuRequest = () => ({type: MENU_REQUEST});
export const menuSuccess = (response) => ({type: MENU_SUCCESS, response});
export const menuFailure = (e) => ({type: MENU_FAILURE, e});

export const loadMenu = () => {
  return async (dispatch) => {
    try {
      dispatch(menuRequest());
      const response = await axiosMenu.get('/menu.json');
      dispatch(menuSuccess(response.data))
    } catch (e) {
      dispatch(menuFailure(e))
    }
  }
};

