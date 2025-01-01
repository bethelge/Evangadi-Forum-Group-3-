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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/question", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(data);
        setFilteredQuestions(data);
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
    const results = questions.filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(results);
    setCurrentPage(1); // Reset to first page on search query change
  }, [searchQuery, questions]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className={classes.questionContainer}>
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

        <input
          type="search"
          className={`form-control ${classes.searchInput}`}
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div>
          <h3>Questions</h3>
          <hr />
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question, i) => (
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
                {i < currentQuestions.length - 1 && (
                  <hr className={classes.divider} />
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No questions match your search.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className={classes.pagination}>
          <button
            className={`btn ${classes.pageButton}`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className={`btn ${classes.pageButton}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className={classes.pageNumber}>{currentPage}</span> /{" "}
          <span>{totalPages}</span>
          <button
            className={`btn ${classes.pageButton}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className={`btn ${classes.pageButton}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
