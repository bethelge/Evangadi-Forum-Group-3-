import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./login.module.css";
import Footer from "../../Componenets/Footer/Footer";
import Header from "../../Componenets/Header/Header";
import About from "../../Componenets/About/About";
import { appState } from "../../App";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [sucess, setSucess] = useState("");
  const [errodata, setErrorData] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { setUser } = useContext(appState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const navigate = useNavigate();
  const emailNameDom = useRef(null);
  const passwordNameDom = useRef(null);

  function validatePassword() {
    const passwordValue = passwordNameDom?.current?.value;
    setPasswordError(passwordValue.length <= 8); // Set error if length < 8
    setEmailError(false);
    setErrorData("");
  }

  function clearEmailError() {
    setEmailError(false);
    setErrorData("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const emailnameValue = emailNameDom.current.value;
    const passwordnameValue = passwordNameDom.current.value;

    if (!emailnameValue || !passwordnameValue) {
      setErrorData("Please provide all required information");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", {
        email: emailnameValue,
        password: passwordnameValue,
      });
      // alert("Login successful");
      setSucess(data.msg);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data)); // Save user data
      setUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        "An unexpected error occurred. Please try again.";
      setErrorData(errorMessage);
      setLoading(false);
      if (errorMessage === "invalid credentilas!") {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  }

  return (
    <>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={`container ${classes.loginContainer}`}>
          <div className="row align-items-center">
            {/* Login Form Section */}
            <div className="col-lg-6 col-md-12">
              <div className={`p-4 ${classes.formWrapper}`}>
                <h3 className="text-center mb-4">Login to your account</h3>
                <p className="text-center">
                  Don’t have an account?{" "}
                  <Link to="/register" className={classes.createAccountLink}>
                    Create a new account
                  </Link>
                </p>
                <form onSubmit={handleSubmit}>
                  {/* Error and Success Messages */}
                  {errodata ? (
                    <small style={{ textAlign: "center", color: "red" }}>
                      {errodata}
                    </small>
                  ) : (
                    <small style={{ textAlign: "center", color: "blue" }}>
                      {sucess}
                    </small>
                  )}
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className={classes.label}>
                      Email
                    </label>
                    <input
                      ref={emailNameDom}
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className={`form-control ${classes.inputField} ${
                        emailError ? classes.emailError : ""
                      }`}
                      onChange={clearEmailError}
                    />
                  </div>
                  {/* Password Field */}
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className={classes.label}>
                      Password
                    </label>
                    <input
                      ref={passwordNameDom}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Your Password"
                      onChange={validatePassword}
                      className={`form-control ${classes.inputField} ${
                        passwordError ? classes.passwordError : ""
                      }`}
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className={classes.eyeIcon}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className={`btn btn-warning w-100 ${classes.submitButton}`}
                    >
                      {loading ? (
                        <div className={classes.loader}>
                          <ClipLoader size={22} color="grey" />
                          <small>please wait</small>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    <Link to="/register" className={classes.createAccountLink}>
                      Create an account?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            {/* About Section */}
            <div className="col-lg-6 col-md-12 d-flex">
              <About />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
