import { GET_ERRORS,
         CURRENT_TYPE 
        } from "../actions/types";

const initialState = {};

export function errorR (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CURRENT_TYPE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
export default errorR;