import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utilities/axios";
import classes from './Landing/Landing.module.css';
import setAuthToken from "../../utilities/setAuth";

const Login = (props) => {
  if(localStorage.getItem("token")){
    props.history.push('/cards');
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    api.post("/auth", formData)
    .then((res) => {
      if(!res) {
        console.log('No user');
      }
      setAuthToken(res.data.token);
      window.location.href = '/cards'
    }).catch(err => {
      err = document.getElementById("form");
      let p = document.createElement("p")
      err.appendChild(p);
      p.setAttribute("style", "color : #b95e5e; background-color : #ff000014");
      p.innerHTML = "No User Found!";
      setTimeout(() => {
        let rem = document.getElementById("form");
        rem.removeChild(p);
      }, 1000);
    });
  };
  return (
    <>
      <div className={classes.block}>
        <div className={classes.header}>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
        <form className={classes['email-login']} id="form" autoComplete="off" onSubmit={onSubmit}>
          <div className={classes['u-form-group']}>
            <input
              value={email}
              onChange={onChange}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={classes['u-form-group']}>
            <input
              value={password}
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className={classes.buttons}>
            <input type="submit" className={classes.login} value="Login" />
            <br />
            <p>
            Don't have an account? <Link to="/register">Sign Up Now!</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
