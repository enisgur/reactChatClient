import React, { useState } from "react";

const Users = ({ activeUsers, currentRoom, sendPrivateMessage }) => {
  // console.log("from USERS : ", activeUsers);

  const [userClicked, setuserClicked] = useState({
    userID: null,
    userClicked: false,
  });
  // // const [userOptions, setUserOptions] = useState();

  const onClick = (e) => {
    e.preventDefault();

    const socketID = e.target.id;

    // change state that user clicked
    setuserClicked({ userID: socketID, userClicked: true });

    // Open modal or some kind popup to show options

    // on Click to private chat
    // open a popup screen or new tab to chat private to seleceted user
  };

  const userSendMessage = (e) => {
    // console.log("from private message : ", e.target.id);
    sendPrivateMessage(e.target.id);
  };

  const clickedUserOutpud = (usrID) => {
    return (
      <div className="clicked-user">
        <ul>
          <li id={usrID} onClick={(e) => userSendMessage(e)}>
            PM
          </li>
          <li>Close</li>
        </ul>
      </div>
    );
  };

  return (
    <div id="users">
      <div className="heading">
        <h3>USERS</h3>
        <br />
      </div>
      <div id="online-users">
        {activeUsers.map((user) => {
          if (currentRoom == user.room) {
            return (
              <div key={user.id} id={user.id} onClick={(e) => onClick(e)}>
                {user.username}
                {userClicked.userID === user.id && clickedUserOutpud(user.id)}
              </div>
            );
          }
        })}
        {/* <div>Joe</div>
        <div>Joe</div>
        <div>Joe</div> */}
      </div>
    </div>
  );
};

export default Users;
