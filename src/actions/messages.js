import {
  SET_MESSAGES,
  GET_HISTORY,
  PRIVATE_MESSAGES,
  CLEAR_MESSAGES,
  ISPM,
} from "./types";

export const setActionMessages = (messages) => async (dispatch) => {
  await dispatch({
    type: SET_MESSAGES,
    payload: messages,
  });
};

export const clearActionMessages = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};

export const setPrivateMessages = (privateMessages) => (dispatch) => {
  dispatch({
    type: PRIVATE_MESSAGES,
    payload: privateMessages,
  });
};

export const setIsPm = (isPm) => (dispatch) => {
  dispatch({
    type: ISPM,
    payload: isPm,
  });
};

export const getActionHistoy = (messages) => (dispatch) => {
  dispatch({
    type: GET_HISTORY,
    payload: messages,
  });
};
