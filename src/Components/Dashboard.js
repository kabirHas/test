import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import Settings from "./Settings";
import Leads from "./Leads";
import Nav from "./Nav";
import myImage from "../images/logo.svg";
import Test from "./test";

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div className="top-teir">
          <div className="left-sidebar">
            <div className="site-logo">
              <a href="/">
                <img src={myImage} alt="Logo" />
              </a>
            </div>
            <div className="inner-side">
              <div className="Menu-head">Menu</div>
              <Nav />
            </div>
          </div>
          <div className="right-area">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}
export default Dashboard;
