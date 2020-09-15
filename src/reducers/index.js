import { combineReducers } from "redux";

// import alert from "./alert";
// import parts from "./part";
// import auth from './auth';
// import products from './products';

import user from "./user";
import messages from "./messages";
import onlineUsers from "./onlineUsers";
import room from "./room";
import privateMessages from "./privateMessages";
import isPm from "./isPm";

export default combineReducers({
  user,
  messages,
  onlineUsers,
  currentRoom: room,
  privateMessages,
  isPm,

  //   alert,
  //   parts,
  //   auth,
  //   products
});
