import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./about.module.css";

function About() {
  return (
    <div className={` ${classes.aboutWrapper}`}>
      <small className={`text-warning d-block mb-2 ${classes.about}`}>
        About
      </small>
      <h3 className={`fw-bold text-dark mb-3 ${classes.aboutTitle}`}>
        Evangadi Networks Q&A
      </h3>
      <p className={`text-secondary mb-3 ${classes.aboutText}`}>
        No matter what stage of life you are in, whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps!
      </p>
      <p className={`text-secondary mb-4 ${classes.aboutText}`}>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button className={`btn btn-warning fw-bold ${classes.howItWorksButton}`}>
        HOW IT WORKS
      </button>
    </div>
  );
}

export default About;
