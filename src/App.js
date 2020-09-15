import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import About from "./components/About/About";
import Home from "./components/Home/Home";
import ChatHome from "./components/Chat/home/Home";
import ChatMain from "./components/Chat/main/Main";

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* only logged in user can access this home route */}
        {/* <PrivateRoute path="/" exact component={HomePage} /> */}
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/chat" exact component={ChatHome} />
        <Route path="/chat/main" exact component={ChatMain} />
        {/* <Route path="/chat/main/:username" exact component={ChatMain} /> */}
        {/* <Route path="/signup" component={RegisterPage} /> */}
      </Router>
    </Provider>
  );
}

export default App;
