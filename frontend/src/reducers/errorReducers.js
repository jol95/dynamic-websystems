import { GET_ERRORS,
        } from "../actions/types";

const initialState = {
    who: ""
};

export function errorR (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
export default errorR;