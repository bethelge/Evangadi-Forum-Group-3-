import React from 'react';
import classes from './footer.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";

function Footer() {
  return (
    <footer className={`bg-dark text-white py-5 ${classes.footer}`}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 text-center">
            <div className={classes.logoPlaceholder}>
              <img src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png" alt=""/>
            </div>
            {/* Icons below the logo */}
            <div className={classes.iconGroup}>
              <FaFacebookF className={classes.icon} />
              <FaInstagram className={classes.icon} />
              <RiYoutubeLine className={classes.icon} />
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-4 text-center">
            <h5 className={classes.footerTitle}>Useful Link</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-white">How it works</a></li>
              <li><a href="#" className="text-decoration-none text-white">Terms of Service</a></li>
              <li><a href="#" className="text-decoration-none text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className={classes.footerTitle}>Contact Info</h5>
            <p>support@evangadi.com</p>
            <p>+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;