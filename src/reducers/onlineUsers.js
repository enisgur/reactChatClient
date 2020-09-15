import { GET_ONLINE_USERS } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ONLINE_USERS:
      return (state = payload);
    default:
      return state;
  }
}
