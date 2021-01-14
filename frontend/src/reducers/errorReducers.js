import { GET_ERRORS,
         CURRENT_TYPE 
        } from "../actions/types";

const initialState = {
    who: ""
};

export function errorR (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CURRENT_TYPE:
      return {
        ...state,
        who: action.payload
      };
    default:
      return state;
  }
}
export default errorR;