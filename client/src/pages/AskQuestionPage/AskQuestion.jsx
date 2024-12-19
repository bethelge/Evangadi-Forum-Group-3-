import React, { useContext, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap
import classes from "./askQuestion.module.css";
import axios from "../../axiosConfig"; // Ensure axiosConfig has the correct base URL
import { appState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Componenets/Header/Header";
import Footer from "../../Componenets/Footer/Footer";
import { ClipLoader } from "react-spinners";

function AskQuestion() {
  const [file, setFile] = useState("");
  const [postError, setPostError] = useState("");
  const [loading, setLoading] = useState(false);
  const titleDom = useRef(null);
  const descDom = useRef(null);
  const { user } = useContext(appState);
  const navigate = useNavigate();

  function resetMessage() {
    setFile("");
    setPostError("");
  }

  // Function to post the question
  async function handlePostQuestion(e) {
    e.preventDefault();

    const titleValue = titleDom.current.value;
    const descValue = descDom.current.value;

    if (!titleValue || !descValue) {
      setPostError("Please Provide all fields");
      return;
    }

    try {
      // Ensure token is available
      const token = localStorage.getItem("token");
      if (!token) {
        setPostError("User not authenticated");
        return;
      }

      // API call to post the question
      setLoading(true);
      const { data } = await axios.post(
        "/question",
        {
          title: titleValue,
          description: descValue,
          tag: "general", // Example tag, adjust as needed
          userid: user?.userid, // Replace with dynamic user ID from authentication
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is sent with the request
          },
        }
      );
      console.log(data);
      // setFile(data.message);
      setFile(`${data.message}:redirecting to home page`);
      setLoading(false);
      setPostError("");
      // Emptying the fields after successful submission
      titleDom.current.value = "";
      descDom.current.value = "";
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setPostError(
          error.response.data.error || "An unexpected error occurred"
        );
      } else {
        setPostError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <section className={classes.postQuestion}>
        <div className="container">
          <div className={`row justify-content-center ${classes.stepsSection}`}>
            <div className="col-12 text-center">
              <h1 className={classes.stepsTitle}>
                Steps to write a good question
              </h1>
            </div>
            <div className={`${classes.lists}`}>
              <ul className={classes.stepsList}>
                <li className={classes.stepItem}>
                  <span className={classes.arrow}>→</span> Summarize your
                  problem in a one-line title.
                </li>
                <li className={classes.stepItem}>
                  <span className={classes.arrow}>→</span> Describe your problem
                  in more detail.
                </li>
                <li className={classes.stepItem}>
                  <span className={classes.arrow}>→</span> Describe what you
                  tried and what you expected to happen.
                </li>
                <li className={classes.stepItem}>
                  <span className={classes.arrow}>→</span> Review your question
                  and post it to the site.
                </li>
              </ul>
            </div>
          </div>
          <div className={`row justify-content-center ${classes.formSection}`}>
            <div className="col-12 text-center">
              <h2 className={classes.formTitle}>Ask a public question</h2>
              <p className={classes.formLink}>
                <Link to="/">Go to Question page</Link>
              </p>
            </div>
            <div className="col-10">
              <form onSubmit={handlePostQuestion}>
                <div>
                  {postError ? (
                    <small style={{ textAlign: "center", color: "red" }}>
                      {postError}
                    </small>
                  ) : (
                    <small style={{ textAlign: "center", color: "blue" }}>
                      {file}
                    </small>
                  )}
                </div>
                <input
                  ref={titleDom}
                  type="text"
                  className={`form-control ${
                    postError ? classes.errorInput : classes.questionTitle
                  }`}
                  placeholder="Title"
                  onChange={resetMessage}
                />
                <textarea
                  ref={descDom}
                  className={`form-control ${
                    postError ? classes.errorInput : classes.questionDescription
                  }`}
                  placeholder="Question Description..."
                  rows="6"
                  onChange={resetMessage}
                ></textarea>
                <button
                  className={`btn btn-primary w-100 ${classes.postButton}`}
                  type="submit"
                >
                  {loading ? (
                    <div className={classes.loader}>
                      <ClipLoader size={22} color="grey" />
                      <small>please wait</small>
                    </div>
                  ) : (
                    "Post Your Question"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AskQuestion;
