import { GET_CURRENT_ROOM } from "./types";

export const setActionCurrentRoom = (currentRoom) => (dispatch) => {
  dispatch({
    type: GET_CURRENT_ROOM,
    payload: currentRoom,
  });
};
