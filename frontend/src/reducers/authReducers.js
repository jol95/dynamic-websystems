import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_ROLE
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    role: false,
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
      case SET_ROLE:
        console.log("ROLE=TRUE MFA");
        return {
          ...state,
          role: true
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  export default authR;