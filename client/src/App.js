import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cards from "./components/Cards";
import PrivateRoute from "./components/Routing/PvtRoute";
import Landing from "./components/UI/Landing/Landing";
import Login from "./components/UI/Login";
import Register from "./components/UI/Register";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/cards" component={Cards} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
