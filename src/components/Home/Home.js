import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import Navbar from "./Navbar/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <section className="main-section">
        <h1>Wellcome !</h1>
        <p>This application stil on development!</p>
        <p>You are wellcome to test it.</p>
      </section>
      <div className="main-links">
        {/* <Link to="/about"> About</Link> */}
        <Link to="/chat"> CHAT</Link>
      </div>
    </div>
  );
}

export default Home;
