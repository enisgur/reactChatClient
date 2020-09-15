import React, { Fragment, useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const History = ({ msges, user }) => {
  useEffect(() => {
    const historyMessages = document.getElementById("history");
    historyMessages.scrollTop = historyMessages.scrollHeight;

    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: "smooth",
    // });
  });

  return (
    <Fragment>
      <div id="history">
        {msges.map((msg, i) => {
          const isUser = msg.username == user ? "me" : "other";
          const classIs = `message ${isUser}`;

          if (!msg.text) return null;

          return (
            <div key={i} className={classIs}>
              <p className="meta">
                {msg.username} <span>{msg.time}</span>
              </p>
              <p className="text">{msg.text}</p>
            </div>
          );
        })}

        {/* {historyChat.map((msg) => {
          return (
            <Fragment>
              <div className="message">
                <p className="meta">
                  {msg.username} <span>{msg.time}</span>
                </p>
                <p className="text">{msg.text}</p>
              </div>
            </Fragment>
          );
        })} */}
        {/* <div class="message">
              <p class="meta">
                Enis <span>9:12pm</span>
              </p>
              <p class="text">Naber deneme message</p>
            </div> */}
        {/* </scrollToBottom> */}
      </div>
    </Fragment>
  );
};

export default History;
