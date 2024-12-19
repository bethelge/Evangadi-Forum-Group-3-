import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./questionAnswer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { appState } from "../../App";
import Header from "../../Componenets/Header/Header";

function QuestionAnswer() {
  const { question_id } = useParams();
  const [singleQues, setSingleQues] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [errorAns, setErrorAns] = useState("");
  const [sucess, setSucess] = useState("");
  const { user } = useContext(appState);
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Add the token to headers
      };
      const singleQuestion = await axios.get(`/question/${question_id}`, {
        headers,
      });
      const answersResponse = await axios.get(`/answers/${question_id}`, {
        headers,
      });
      setSingleQues(singleQuestion.data);
      setAnswers(answersResponse?.data || []);
      setErrorAns("");
    } catch (error) {
      console.error("Error fetching data:", error.response?.data);
      setErrorAns(error.response?.data?.error || "Error fetching data");
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [question_id, token]);

  const handleAnswerSubmit = async () => {
    if (!newAnswer) {
      console.log("All fields are required");
      setErrorAns("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `/answers/postAnswers`,
        {
          userid: user.userid,
          questionid: question_id,
          answer: newAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in headers
          },
        }
      );
      setAnswers((prev) => [
        { answer: newAnswer, username: user.username },
        ...prev,
      ]);
      setNewAnswer("");
      setErrorAns("");
      setSucess(response?.data?.message);
    } catch (error) {
      console.error("Error submitting answer:", error.response?.data?.error);
      setErrorAns(error.response?.data?.error || "Error submitting answer");
    }
  };

  return (
    <>
      <Header />
      <div className={`container ${classes.container}`}>
        {/* Question Section */}
        <div className={`mb-4 ${classes.questionSection}`}>
          <h1 className={classes.title}>Question</h1>
          <div className={classes.questionDetails}>
            <h3 className={classes.questionTitle}>{singleQues?.title} ?</h3>
            <small className={classes.description}>
              {singleQues?.description}
            </small>
          </div>
        </div>

        {/* Answers Section */}
        <div className={`mb-4 ${classes.answersSection}`}>
          <h2 className={classes.sectionTitle}>Answer From The Community</h2>
          <div className={classes.answersList}>
            {answers.length > 0 ? (
              answers.map((answer, index) => (
                <div key={index} className={`d-flex ${classes.answerItem}`}>
                  <div className={classes.avatarSection}>
                  <div className={classes.user__icon}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={classes.username}>{answer.username}</span>
                  </div>
                  <p className={classes.answerText}>{answer.answer}</p>
                </div>
              ))
            ) : (
              <p>No answers yet. Be the first to answer!</p>
            )}
          </div>
        </div>

        {/* Answer Submission Section */}
        <div className={`p-4 ${classes.submitSection}`}>
          <div style={{ textAlign: "center" }}>
            <h3 className={classes.sectionTitle}>Answer The Top Question</h3>
            <div>
              <Link to="/">Go to Question page</Link>
            </div>
            {errorAns ? (
              <small
                style={{ textAlign: "center", color: "red", width: "100%" }}
              >
                {errorAns}
              </small>
            ) : (
              <small
                style={{ textAlign: "center", color: "blue", width: "100%" }}
              >
                {sucess}
              </small>
            )}
          </div>
          <textarea
            className={`form-control mb-3 ${classes.textArea}`}
            placeholder="Your Answer..."
            rows="4"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          ></textarea>
          <button
            className={`btn btn-primary ${classes.submitButton}`}
            onClick={handleAnswerSubmit}
          >
            Post Your Answer
          </button>
        </div>
      </div>
    </>
  );
}

export default QuestionAnswer;
