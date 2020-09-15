import { GET_CURRENT_ROOM } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_ROOM:
      return (state = payload);
    default:
      return state;
  }
}
