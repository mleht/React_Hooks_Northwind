import React, { useState, useEffect } from "react";
import { Switch, Route, Link, HashRouter } from "react-router-dom";
import CustomerList from "./customers/CustomerList";
import etusivu from "./etusivu";
import LoginList from "./logins/LoginList";
import notFoundPage from "./notFoundPage";
import ProductList from "./products/ProductList";

import LoginForm from "./LoginForm";

const Navigaatio = () => {
  // State kirjautuneesta käyttäjästä
  // const [currentUser, setCurrentUser] = useState();

  // Statet Login aiheisesta Messagen näyttämisestä
  //const [showMessage, setShowMessage] = useState(false);
  //const [isPositive, setIsPositive] = useState(true);
  //const [message, setMessage] = useState("");

  // use effectissä tarkistetaan onko selaimen local storagessa user tietoa vanhastaan
  /* useEffect(() => {
    const userFromLS = localStorage.getItem("user");
    if (userFromLS) {
      setCurrentUser(userFromLS);
    }
  }, [currentUser]); */

  return (
    <HashRouter basename="/somefolder">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark color-nav py-3">
          <Link to="/" className="navbar-brand">
            Northwind React Hooks App 2021
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/customers" className="nav-link">
                  Customers
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/logins" className="nav-link">
                  Users
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/account" className="nav-link">
                  User Account
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={etusivu} />
          <Route path="/customers" component={CustomerList} />
          <Route path="/products" component={ProductList} />
          <Route path="/logins" component={LoginList} />
          <Route path="/account" component={LoginForm} />
          <Route path="*" component={notFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Navigaatio;
