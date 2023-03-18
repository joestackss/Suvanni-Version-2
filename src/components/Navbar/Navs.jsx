import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

const Navs = () => {
  const [navToggle, setNavToggle] = useState(false);
  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };

  return (
    <nav className="navbar w-100 flex">
      <section className="containers w-100">
        <div className="navbar-content flex fw-3">
          <div className="brand-and-toggler flex flex-between nav-width">
            <Link to="/">
              <h1>Suvanni Stocks</h1>
            </Link>
            <div
              type="button"
              className={`hamburger-menu ${
                navToggle ? "hamburger-menu-change" : ""
              }`}
              onClick={navHandler}
            >
              <div className="bar-top"></div>
              <div className="bar-middle"></div>
              <div className="bar-bottom"></div>
            </div>
          </div>

          <div
            className={`navbar-collapse ${
              navToggle ? "show-navbar-collapse" : ""
            }`}
          >
            <div className="navbar-collapse-content">
              <ul className="navbar-nav nav-width-1" id="ul">
                <li>
                  <a href="#projects">Money</a>
                </li>
                <li>
                  <a href="#tools">Finance</a>
                </li>
                <li>
                  <a href="#testimonial">Tool</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              <div className="flex navbar-btns ">
                <button type="button" className="btn btn-primary" id="btn">
                  Login / Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navs;
