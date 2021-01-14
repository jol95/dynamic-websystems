import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_CURRENT_PICTURE
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    picture: {},
    user: {},
    loading: false
  };


  export function authR(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_CURRENT_PICTURE:
        return {
          ...state,
          picture: action.payload
        };
      default:
        return state;
    }
  }
  export default authR;