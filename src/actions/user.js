import { SET_USER, GET_ONLINE_USERS } from "./types";

export const setUser = (username) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: { username },
  });
};

export const onlineUsers = (activeUsers) => (dispatch) => {
  dispatch({
    type: GET_ONLINE_USERS,
    payload: activeUsers,
  });
};
