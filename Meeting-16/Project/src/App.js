import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorialHook from "./components/AddTutorial";
import TutorialsListHook from "./components/TutorialsList";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            olAcademy
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Firebase Database CRUD</h2>
          <Switch>
            <Route
              exact
              path={["/", "/tutorials"]}
              component={TutorialsListHook}
            />
            <Route exact path="/add" component={AddTutorialHook} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
