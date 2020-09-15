import { SET_MESSAGES, GET_HISTORY, CLEAR_MESSAGES } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HISTORY:
      return (state = payload);
    case SET_MESSAGES:
      return (state = [...state, payload]);
    case CLEAR_MESSAGES:
      return (state = []);
    default:
      return state;
  }
}

const editMessages = (state, payload) => {
  state = [];
  const { user, text, time, room } = payload;
};

// let sss = [
//   {
//     room:"general",
//     messages: [
//       {user:"test", message:"naber"},
//       {user:"test", message:"naber"},
//       {user:"test", message:"naber"}
//     ]
//   }
// ]
