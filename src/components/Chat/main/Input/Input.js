import React, { useState } from "react";

function Input({ sendMsg }) {
  const [formInput, setFormInput] = useState("");

  const onChange = (e) => {
    setFormInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formInput);

    // Send FormInput
    // sendMsg(formInput);
    sendMsg({ message: formInput, room: "" });

    //then clear input
    setFormInput("");

    // Auto scrool chat bottom after submit
  };

  return (
    <div id="user-input">
      <form
        className="form-send"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          id="msg"
          autoComplete="off"
          className="chat-input"
          type="text"
          onChange={(e) => {
            onChange(e);
          }}
          value={formInput}
        />
        <button className="chat-send">Send</button>
      </form>
    </div>
  );
}

export default Input;
