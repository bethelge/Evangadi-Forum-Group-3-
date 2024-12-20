import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./register.module.css";
import Header from "../../Componenets/Header/Header";
import Footer from "../../Componenets/Footer/Footer";
import About from "../../Componenets/About/About"; // Importing the About component
import { ClipLoader } from "react-spinners";

function Register() {
  const [data, setData] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false); // Track email error
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailNameDom = useRef(null);
  const passwordNameDom = useRef(null);

  function validatePassword() {
    const passwordValue = passwordNameDom.current.value;
    setPasswordError(passwordValue.length < 8); // Set error if length < 8
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailnameValue = emailNameDom.current.value;
    const passwordnameValue = passwordNameDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailnameValue ||
      !passwordnameValue
    ) {
      setData("Please provide all required information");
      return;
    }

    if (passwordnameValue.length < 8) {
      setData("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailnameValue,
        password: passwordnameValue,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const errorMessage = error?.response?.data?.msg;
        setData(errorMessage);
        setLoading(false);

        // Check for specific error to set emailError state
        if (errorMessage.includes("user already existed")) {
          setEmailError(true);
        }
      } else {
        setData("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={`container ${classes.registerContainer}`}>
          <div className="row align-items-center">
            {/* Register Form Section */}
            <div className="col-lg-6 col-md-12">
              <div className={`p-4 ${classes.formWrapper}`}>
                <h3 className={`text-center mb-4 ${classes.formTitle}`}>
                  Join the network
                </h3>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/login" className={classes.signInLink}>
                    Sign in
                  </Link>
                </p>
                <form onSubmit={handleSubmit}>
                  <small
                    style={{
                      textAlign: "center",
                      color: "red",
                      maxWidth: "100%",
                    }}
                  >
                    {data}
                  </small>
                  <div className="mb-3">
                    <label htmlFor="username" className={classes.label}></label>
                    <input
                      ref={userNameDom}
                      type="text"
                      id="username"
                      placeholder="Username"
                      className={`form-control ${classes.inputField}`}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="me-2 w-50">
                      <label
                        htmlFor="firstName"
                        className={classes.label}
                      ></label>
                      <input
                        ref={firstNameDom}
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        className={`form-control ${classes.inputField}`}
                      />
                    </div>
                    <div className="ms-2 w-50">
                      <label
                        htmlFor="lastName"
                        className={classes.label}
                      ></label>
                      <input
                        ref={lastNameDom}
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        className={`form-control ${classes.inputField}`}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className={classes.label}></label>
                    <input
                      ref={emailNameDom}
                      type="email"
                      id="email"
                      placeholder="Email"
                      className={`form-control ${classes.inputField} ${
                        emailError ? classes.emailError : ""
                      }`}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className={classes.label}></label>
                    <input
                      ref={passwordNameDom}
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={validatePassword}
                      className={`form-control ${classes.inputField} ${
                        passwordError ? classes.passwordError : ""
                      }`}
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <button
                      type="submit"
                      className={`btn btn-primary w-100 ${classes.submitButton}`}
                    >
                      {loading ? (
                        <div className={classes.loader}>
                          <ClipLoader size={22} color="grey" />
                          <small>please wait</small>
                        </div>
                      ) : (
                        "  Agree and Join"
                      )}
                    </button>
                  </div>
                  <p className={`text-center ${classes.agreementText}`}>
                    I agree to the{" "}
                    <Link to="#" className={classes.privacyPolicyLink}>
                      privacy policy
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className={classes.termsServiceLink}>
                      terms of service.
                    </Link>
                  </p>
                  <p className="text-center">
                    <Link to="/login" className={classes.signInLink2}>
                      Already have an account?
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

export default Register;
