import React from "react";
import { Link } from "react-router-dom";
import classes from "../Landing/Landing.module.css";

const Landing = (props) => {
  if(localStorage.getItem("token")) {
    props.history.push('/cards');
  }
  return (
    <div className="worm">
        <div className={classes.block}>
          <h1 className="x-large">Welcome to Flashcards</h1>
          <p className="lead">
            Create your own flashcards and test your knowledge on anything!
          </p>
          <div className={classes.landingButtons}>
            <Link to="/register" >
              Sign Up
            </Link>
            <br />
            <Link to="/login">
              Login
            </Link>
          </div>
        </div>
    </div>
  );
};


export default Landing;
