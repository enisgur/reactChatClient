import React, { Fragment } from "react";
import { setUser } from "../../../../actions/user";

const Rooms = ({
  callBack,
  privateMessage,
  onPMClick,
  socketID,
  openWindow,
}) => {
  // // const [userOptions, setUserOptions] = useState();
  console.log("ROOMS SOCKET ID ROOMS SOCKET ID ROOMS SOCKET ID :", socketID);
  console.log("openWindow openWindow openWindow  ", openWindow);
  let duplicateUser = [];

  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  const onClick = (e) => {
    e.preventDefault();

    const selectedRoom = e.target.id;

    callBack(selectedRoom);
  };

  const pmClick = (e) => {
    e.preventDefault();
    const senderID = e.target.id;

    onPMClick(senderID);
  };

  return (
    <Fragment>
      <div className="rooms">
        {/* ROOMS  */}
        <div className="heading">
          <h3>Rooms</h3>
          <br />
        </div>
        <div id="online_rooms">
          <ul>
            <li id="#general" onClick={(e) => onClick(e)}>
              General
            </li>
            <li id="#family" onClick={(e) => onClick(e)}>
              Family
            </li>
            <li id="#test" onClick={(e) => onClick(e)}>
              Test
            </li>
          </ul>
        </div>
        <hr />
        {/* PRIVATE CHAT */}
        <div className="heading">
          <br />
          <h3>Private Chat</h3>
          <br />
        </div>
        <div id="private-rooms">
          <ul>
            {openWindow ? (
              <li>{openWindow}</li>
            ) : (
              privateMessage.map((pm, i) => {
                if (!duplicateUser.includes(pm.sender.id)) {
                  duplicateUser.push(pm.sender.id);
                  duplicateUser.push(pm.receiver.id);
                  // if (pm.sender.id !== pm.receiver.id) {
                  if (pm.sender.id === socketID) {
                    return (
                      <li
                        key={i}
                        id={pm.receiver.id}
                        onClick={(e) => pmClick(e)}
                      >
                        {pm.receiver.username}
                      </li>
                    );
                  } else if (pm.sender.id !== pm.receiver.id) {
                    return (
                      <li key={i} id={pm.sender.id} onClick={(e) => pmClick(e)}>
                        {pm.sender.username}
                      </li>
                    );
                  }
                }
              })
            )}
            {/* <li>Joe</li> */}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Rooms;
