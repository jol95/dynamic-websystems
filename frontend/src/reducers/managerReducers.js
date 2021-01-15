import {
    SET_CURRENT_MANAGER,
    MANAGER_LOADING
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isManager: false,
    user: {},
    loading: false
  };


  export function manR(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_MANAGER:
        return {
          ...state,
          isManager: !isEmpty(action.payload),
          user: action.payload
        };
      case MANAGER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  export default manR;