import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./header.module.css";
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
          <Link to="/">
            <img
              src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
              alt="Evangadi Logo"
              className={classes.logo}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={`${classes.nav_links}`}>
          <Link to="/" className="text-decoration-none text-dark">
            Home
          </Link>
          <Link to="/how-it-works" className="text-decoration-none text-dark">
            How it Works
          </Link>
        </nav>

        {/* Sign In and Sign Out */}
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
