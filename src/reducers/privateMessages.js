import { PRIVATE_MESSAGES } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRIVATE_MESSAGES:
      return (state = [...state, payload]);
    default:
      return state;
  }
}
