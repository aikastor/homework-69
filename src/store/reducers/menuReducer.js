import {ADD_ITEM, MENU_FAILURE, MENU_REQUEST, MENU_SUCCESS} from "../actions/actionTypes";

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
};

const menuReducer = (state = initialState, action) => {



  switch (action.type) {
    case MENU_REQUEST:
      return {...state, loading: true};
    case MENU_SUCCESS:
      return {
        ...state,
        menuItems: action.response,
        loading: false,
        error: null,
      };
    case MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
};
export default menuReducer;