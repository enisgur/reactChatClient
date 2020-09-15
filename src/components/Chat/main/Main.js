import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";

import PropTypes from "prop-types";

import "./style.css";

// import { setUser } from "../../../actions/user";
import {
  setActionMessages,
  getActionHistoy,
  setPrivateMessages,
  clearActionMessages,
  setIsPm,
} from "../../../actions/messages";
import { onlineUsers } from "../../../actions/user";
import { setActionCurrentRoom } from "../../../actions/room";

import Users from "./Users/Users";
import History from "./History/History";
import Input from "./Input/Input";
import Rooms from "./rooms/Rooms";
// import user from "../../../reducers/user";

import { searchArrayObject } from "./utils/arrayObjectFind";

const ENDPOINT = "http://localhost:5000";
let socket;
// const rooms = ["#general", "#family"];
let initialRoom = "#general";

const Main = ({
  currentUser,
  messages,
  setActionMessages,
  getActionHistoy,
  onlineUsers,
  activeUsers,
  setActionCurrentRoom,
  currentRoom,
  setPrivateMessages,
  privateMessages,
  clearActionMessages,
  setIsPm,
  isPm,
}) => {
  // Get Current User username
  const { username } = currentUser;
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [pmID, setPmID] = useState();
  const [openPrivateWindow, setOpenPrivateWindow] = useState();
  // const [socketID, setSocketID] = useState();

  useEffect(() => {
    console.log("USEEFFFECT 1st. called *************");
    // Important
    // Important
    // Check connection error.
    // if there is a error redirect the page
    // Important
    // Important

    setActionCurrentRoom(initialRoom);

    console.log("current user is : ", username);
    socket = socketIOClient(ENDPOINT);

    // set socket id to state to use in rooms
    // setSocketID(socket.id);

    // Get All History from the server
    socket.on("chathistory", (data) => {
      // console.log(data);
      // fixx here 1111
      // getActionHistoy(data);
    });

    // Get ALL loged in Users
    socket.on("roomUsers", ({ users }) => {
      console.log("Active users : ", users);
      onlineUsers(users);
    });

    //  Join Chatroom
    socket.emit("join", { username: username, room: initialRoom });
    // socket.emit("join",  username rooms );

    // Component unMount = When browser closed or exit the page
    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    // Get Message from the server
    // and check if pm is on ?

    socket.on("message", async (msgg) => {
      // const asyncFunc = async (msgg) => {
      //   await setChatMessages([...chatMessages, msgg]);
      // };

      // await asyncFunc(msgg);
      // maybe set chat messages to redux store ?? not state
      // setActionMessages(msgg);
      // testFunnnn(msgg);
      setChatMessages([...chatMessages, msgg]);
      // setChatMessages((oldArray) => [...oldArray, msgg]);
      // setNewMessage([...newMessage, msgg]);
      // setNewMessage((oldArray) => [...oldArray, msgg]);
    });
  }, []);

  useEffect(() => {
    const myEffect = async () => {
      if (!isPm) {
        chatMessages.map(async (msg) => {
          setNewMessage([...newMessage, ...chatMessages]);

          await setActionMessages(msg);
        });
      } else {
        // setChatMessages([...chatMessages])
        setNewMessage([...newMessage, ...chatMessages]);
      }
    };

    myEffect();
  }, [chatMessages]);

  useEffect(() => {
    // GET Private Message from the server
    socket.on("private", (msg) => {
      // received private message
      if (socket.id === msg.receiver.id) {
        console.log("PRIVATE PRIVATE PRIVATE PRIVATE  :", msg);
        // if (msg.sender.text) {
        // }
        setPrivateMessages(msg);
        // setSendPmId(msg.sender.id);
      } else if (socket.id === msg.sender.id) {
        //sended private message
        // if (msg.sender.text) {
        // }
        setPrivateMessages(msg);
      }
    });
  }, []);

  useEffect(() => {
    const myEffect = () => {
      console.log("PRIVATE messages runed !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(privateMessages);
      console.log(isPm);
      // console.log("checkk senderID: ", sendPmId);

      privateMessages.map(async (pMsg) => {
        const { sender, receiver } = pMsg;
        let receivedPM = {
          username: sender.username,
          text: sender.text,
          time: moment().format("h:mm a"),
          room: "private",
        };
        if (isPm) {
          await clearActionMessages();
          await setActionMessages(receivedPM);
        }
      });
    };

    myEffect();
  }, [privateMessages]);

  // useEffect(() => {
  //   console.log("setActionMessages runed !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // }, [setActionMessages]);

  const sendMessage = (msg) => {
    // Send Regular message to Room
    if (!isPm) {
      const sMessage = {
        message: msg.message,
        room: currentRoom,
      };
      // console.log(sMessage);
      socket.emit("chatMessage", sMessage);
    } else {
      // Find receiver ID if isPM
      const isTherePmID = pmID ? true : false;
      if (isTherePmID) {
        sendPrivateMessage(pmID, msg.message);
      }
    }
  };

  const openPrivateMessage = async (receiverID) => {
    const receiverUser = await searchArrayObject(receiverID, activeUsers);
    setOpenPrivateWindow(receiverUser.username);
    onPMClick(receiverID);
    // setIsPm(true);
    // setPmID(receiverID);
    // clearActionMessages();
  };

  const sendPrivateMessage = async (receiverID, text) => {
    // Get receiver user from online active users
    const receiverUser = await searchArrayObject(receiverID, activeUsers);

    // Check cant send yourself PM
    if (receiverID !== socket.id) {
      let privateMessage = {
        sender: {
          id: socket.id,
          username: username,
          text,
        },
        receiver: {
          id: receiverID,
          username: receiverUser.username,
        },
      };

      socket.emit("privateMessage", privateMessage);
    }
  };

  const mapPmMessages = async (senderID) => {
    // console.log("3333333333333333333333333333333333333333");
    await clearActionMessages();
    await privateMessages.forEach(async (pMsg) => {
      const { sender, receiver } = pMsg;
      // console.log("111111111111111111111111111111111111111111111");
      // if (senderID === sender.id) {
      let receivedPM = {
        username: sender.username,
        text: sender.text,
        time: moment().format("h:mm a"),
        room: "private",
      };

      await setActionMessages(receivedPM);
      // }
    });

    // privateMessages.map((pMsg) => {
    //   // console.log("OOOOOOOOOOOOO : ", pMsg);
    //   // console.log("IIIIIIIIIIIIIIIIIIII : ", senderID);
    //   const { sender, receiver } = pMsg;
    //   console.log("111111111111111111111111111111111111111111111");
    //   if (senderID === sender.id) {
    //     let receivedPM = {
    //       username: sender.username,
    //       text: sender.text,
    //       time: moment().format("h:mm a"),
    //       room: "private",
    //     };

    //     clearActionMessages();
    //     setActionMessages(receivedPM);
    //   }
    // });
  };

  const onPMClick = (pmID) => {
    // pmID is id of who send you message = senderID
    console.log("PM CLICKED : ", pmID);

    // Clear the Chat
    // clearActionMessages();

    // setActionMessages()
    // it will change the messages to clicked ones

    // first get all private messages

    // pm on
    setIsPm(true);

    // setPmId to reach it on sendMessage if isPm is True
    setPmID(pmID);
    // isPm = true;

    mapPmMessages(pmID);
  };

  const roomsCallback = async (selectedRoom) => {
    const asycnCallback = async (selectedRoom) => {
      if (selectedRoom === currentRoom) {
        await clearActionMessages();
        // chatMessages.map(async (msg) => {
        //   await setActionMessages(msg);
        // });
        newMessage.map(async (msg) => {
          await setActionMessages(msg);
        });
        await setIsPm(false);
        setOpenPrivateWindow(null);
      } else {
        // Set redux store currentRoom to selected
        setActionCurrentRoom(selectedRoom);

        // Clear the Chat
        clearActionMessages();

        //clear the chat state
        // setChatMessages([null]);
        // setChatMessages((oldArray) => []);

        // Set PM off
        setIsPm(false);

        // set openPrivetaindow to false
        setOpenPrivateWindow(null);
        // isPm = false;

        //  Join Chatroom
        socket.emit("changeRoom", { username: username, room: selectedRoom });
      }
    };

    await asycnCallback(selectedRoom);
  };

  return !currentUser ? (
    <Redirect to="/" />
  ) : (
    <main>
      <Rooms
        callBack={(cRoom) => {
          roomsCallback(cRoom);
        }}
        privateMessage={privateMessages}
        // check user 1st time clicked ?
        // end re-render the rooms
        // to add user to rooms ui
        openWindow={openPrivateWindow}
        onPMClick={(pm) => {
          onPMClick(pm);
        }}
        socketID={socket ? socket.id : "null"}
      />
      <div id="chat-main">
        <History msges={messages} user={username} />

        {/* <History newMsg={message} /> */}
        {/* <History msges={{messages}} newMsg={{}} /> */}
        <Input
          sendMsg={(msg) => {
            sendMessage(msg);
          }}
        />
      </div>

      <Users
        activeUsers={activeUsers}
        currentRoom={currentRoom}
        sendPrivateMessage={(msg) => {
          openPrivateMessage(msg);
        }}
        // sendPrivateMessage={(msg) => {
        //   sendPrivateMessage(msg);
        // }}
      />
    </main>
  );
};

Main.propTypes = {
  currentUser: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  currentRoom: PropTypes.string.isRequired,
  privateMessages: PropTypes.array.isRequired,
  isPm: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.user,
  messages: state.messages,
  activeUsers: state.onlineUsers,
  currentRoom: state.currentRoom,
  privateMessages: state.privateMessages,
  isPm: state.isPm,
});

export default connect(mapStateToProps, {
  setActionMessages,
  getActionHistoy,
  onlineUsers,
  setActionCurrentRoom,
  setPrivateMessages,
  clearActionMessages,
  setIsPm,
})(Main);
