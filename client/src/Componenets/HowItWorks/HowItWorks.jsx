import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Card } from "react-bootstrap"; // Import Card from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import classes from "./howitworks.module.css"; // Import your custom CSS

const HowItWorks = () => {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Card className={`text-center mb-5 ${classes.card}`}>
          {/* Customize the header and body of the card */}
          <Card.Header as="h5" className={`${classes.header}`}>
            How Evangadi Forum Works
          </Card.Header>
          <Card.Body className={`${classes.body}`}>
            <Card.Title className={`${classes.title}`}>
              Welcome to Evangadi Forum
            </Card.Title>
            <Card.Text className="text-dark">
              Evangadi Forum is a question and answer platform for tech-related
              topics designed to connect people and help them grow.
            </Card.Text>
            <Card.Text className="text-dark">This is how it works</Card.Text>
            <div className={classes.numberContainer}>
              <ul className={`list-unstyled ${classes.list}`}>
                <li className={`d-flex align-items-center ${classes.listItem}`}>
                  <span className={classes.number}>1.</span>
                  Evangadi Forum is a Question and Answer Platform: Share your
                  knowledge, ask questions, and help others learn.
                </li>
                <li className={`d-flex align-items-center ${classes.listItem}`}>
                  <span className={classes.number}>2.</span>
                  Respect Each Other: Always show respect when interacting with
                  others in the community.
                </li>
                <li className={`d-flex align-items-center ${classes.listItem}`}>
                  <span className={classes.number}>3.</span>
                  Be Helpful: The more helpful you are, the more the community
                  benefits.
                </li>
                <li className={`d-flex align-items-center ${classes.listItem}`}>
                  <span className={classes.number}>4.</span>
                  We Are Family: Build relationships, connect with like-minded
                  people, and grow together.
                </li>
              </ul>
            </div>
            <Card.Text>
              Feel free to explore, ask questions, or offer your advice. Enjoy
              being part of our community!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
