import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./header.module.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { appState } from "../../App";

function Header() {
  const { user } = useContext(appState);
  return (
    <header className={`${classes.header_container} container-fluid`}>
      <div className={`${classes.header_inner}`}>
        {/* Logo Section */}
        <div>
          <img
            src="	https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt="Evangadi Logo"
            className={classes.logo}
          />
        </div>

        {/* Navigation Links */}
        <nav className={`${classes.nav_links}`}>
          <Link to="/" className="text-decoration-none text-dark">
            Home
          </Link>
          <Link to="/" className="text-decoration-none text-dark">
            How it Works
          </Link>
        </nav>

        {/* Sign and sign out  */}
        {!user ? (
          <div>
            <Link
              to="/login"
              className={`btn btn-primary ${classes.logout_button}`}
            >
              SIGN IN
            </Link>
          </div>
        ) : (
          <Link
            to="/Logout"
            className={`btn btn-primary ${classes.logout_button}`}
          >
            Log Out
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
