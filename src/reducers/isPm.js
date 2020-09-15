import { ISPM } from "../actions/types";

const initialState = false;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ISPM:
      return (state = payload);
    default:
      return state;
  }
}
