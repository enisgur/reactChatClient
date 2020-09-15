import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import "./style.css";

import { setUser } from "../../../actions/user";
// import { connect } from "socket.io-client";

function Home({ setUser }) {
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormdata] = useState({
    username: "",
  });

  const { username } = formData;

  const onChange = (e) => {
    setFormdata({ username: e.target.value });
    // console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setUser(formData.username);
    // setFormdata({ username: "" });
    // send Formdata
    // continue
    // <Redirect to="/chat/main/" />;
    setRedirect(true);
    // <Redirect to="/" />;
  };

  return redirect ? (
    // <Redirect to={`/chat/main/${username}`} />
    <Redirect to="/chat/main" />
  ) : (
    <Fragment>
      <div className="main-login">
        <h1>Wellcome to Test Chat</h1>
        <p>Please enter your nickname</p>
        <form id="login" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => onChange(e)}
            value={username}
          />
          <button type="submit">Chat</button>
        </form>
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  setUser: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   currentUser: state.username,
// });

export default connect(null, { setUser })(Home);
