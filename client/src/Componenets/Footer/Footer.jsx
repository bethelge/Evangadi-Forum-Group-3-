import React from "react";
import classes from "./footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import logo from "../../assets/images/evangadi-logo-footer.png";
import { Link } from "react-router-dom"; // Import Link for internal navigation

function Footer() {
  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className={`text-white py-5 ${classes.footer}`}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 text-center">
            <div className={classes.logoPlaceholder}>
              <img src={logo} alt="Evangadi Logo" />
            </div>
            {/* Icons below the logo */}
            <div className={classes.iconGroup}>
              <div
                onClick={() =>
                  handleRedirect(
                    "https://www.facebook.com/evangaditech?mibextid=ZbWKwL"
                  )
                }
                className={classes.icon}
                role="button"
                tabIndex="0"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </div>
              <div
                onClick={() =>
                  handleRedirect(
                    "https://www.instagram.com/evangaditech?igsh=MXIwcGc5a2pleG1xbw=="
                  )
                }
                className={classes.icon}
                role="button"
                tabIndex="0"
                aria-label="Instagram"
              >
                <FaInstagram />
              </div>
              <div
                onClick={() =>
                  handleRedirect(
                    "https://youtube.com/@evangaditech?si=XWgA9_o0FjeJ9JLU"
                  )
                }
                className={classes.icon}
                role="button"
                tabIndex="0"
                aria-label="YouTube"
              >
                <RiYoutubeLine />
              </div>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-4 text-center">
            <h5 className={classes.footerTitle}>Useful Link</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-decoration-none text-white"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-decoration-none text-white"
                >
                  Privacy Policy
                </Link>
              </li>
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
