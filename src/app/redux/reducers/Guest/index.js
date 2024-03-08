import {
    GUEST_ADDED,
    GUEST_DELETE,
    GUEST_EDIT,
    GUEST_LIST,
    GUEST_ERROR,
    GLOBAL_GUEST_LIST,
    GUEST_SUCCESS
  } from "../../actions/Guest/guestConstant";
  
  const initialState = {
    guestList: [],
    globalGuestList:[],
    loading: false,
    error: null,
    successMessage: null,
    totalPages:null
  };
  
  const reducerFunc = (state = initialState, action) => {
    switch (action.type) {
      case GUEST_LIST:
        return {
          ...state,
          guestList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
          totalPages:action.payload?.totalPages,
        };
      case GLOBAL_GUEST_LIST:
        return {
          ...state,
          globalGuestList: action.payload?.data || [],
          loading: false,
          error: null,
          successMessage:action.payload?.message,
        };
  
      case GUEST_ADDED:
      case GUEST_EDIT:
      case GUEST_DELETE:
        return {
          ...state,
          loading: false,
          successMessage: action.payload?.message,
          error: null
        };
  
      case GUEST_ERROR:
        return {
          ...state,
          loading: false,
          successMessage: null,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default reducerFunc;