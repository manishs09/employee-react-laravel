import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddEmployee from "./components/AddEmployee";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Practical
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/employee"} className="nav-link">
              Employees
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
        <Switch>
          <Route path="/employee/:id" component={Employee} />
          <Route exact path={["/", "/employee"]} component={EmployeeList} />
          <Route exact path="/add" component={AddEmployee} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
