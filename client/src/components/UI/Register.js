import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from './Landing/Landing.module.css';
import api from "../../utilities/axios";

const Register = (props) => {
  if(localStorage.getItem("token")){
    props.history.push('/cards');
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      api.post("/users", formData);
      props.history.push("/login");
    }
  };

  return (
    <>
      <div className={classes.block}>
        <div className={classes.header}>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
        <form className={classes["email-login"]} autoComplete="off" onSubmit={(e) => onSubmit(e)}>
          <div className={classes["u-form-group"]}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => onChange(e)}
              name="email"
              required
            />
          </div>
          <div className={classes["u-form-group"]}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              required
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={classes["u-form-group"]}>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={classes.buttons}>
            <input type="submit" className={classes.login} value="Register" />
            <p>
            Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
