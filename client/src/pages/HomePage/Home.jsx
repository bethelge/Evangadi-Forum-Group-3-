import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { appState } from "../../App";
import Header from "../../Componenets/Header/Header";
import Footer from "../../Componenets/Footer/Footer";

function Home() {
  const { user } = useContext(appState);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredQuestions, setFilteredQuestions] = useState([]); // State for filtered questions
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch questions from the backend
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/question", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(data); // Set the full list of questions
        setFilteredQuestions(data); // Initialize filtered questions
      } catch (error) {
        console.error(
          "Error fetching questions:",
          error?.response?.data || error.message
        );
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [token]);

  useEffect(() => {
    // Filter questions based on the search query
    const results = questions.filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(results);
  }, [searchQuery, questions]);

  return (
    <>
      <Header />
      <div className={classes.questionContainer}>
        {/* Top Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link
            to="/AskQuestion"
            className={`btn btn-primary ${classes.askButton}`}
          >
            Ask Question
          </Link>
          <div>
            <small className={classes.welcomeText}>
              Welcome: {user?.username}
            </small>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="search"
          className={`form-control ${classes.searchInput}`}
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <div>
          <h3>Questions</h3>
          <hr />
          {filteredQuestions?.length > 0 ? (
            filteredQuestions.map((question, i) => (
              <React.Fragment key={i}>
                <div className={classes.avatarSection}>
                  <div className={classes.avatar_user}>
                    <div className={classes.user__icon}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <small className={classes.usernameText}>
                      {question?.username}
                    </small>
                  </div>
                  <div className={`ms-3 ${classes.title}`}>
                    <Link
                      to={`/question/${question?.questionid}`}
                      className={classes.questionTitle}
                    >
                      {question?.title}
                    </Link>
                    <MdKeyboardArrowRight
                      size={30}
                      className={classes.arrowIcon}
                    />
                  </div>
                </div>
                {/* Add horizontal line except after the last question */}
                {i < filteredQuestions.length - 1 && (
                  <hr className={classes.divider} />
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No questions match your search.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
