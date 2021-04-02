import React, { useState, useEffect } from "react";
import { Switch, Route, Link, HashRouter } from "react-router-dom";
import CustomerList from "./customers/CustomerList";
import etusivu from "./etusivu";
import LoginList from "./logins/LoginList";
import notFoundPage from "./notFoundPage";
import ProductList from "./products/ProductList";

import LoginForm from "./LoginForm";

const Navigaatio = () => {
  // State kirjautuneesta käyttäjästä pidetään muistissa täällä navigaatio.jsx:ssä, kirjautuessa ensimmäistä kertaa se asetetaan loginform.jsx:ssä jonne alla olevat propsina
  const [currentUser, setCurrentUser] = useState();

  // use effectissä tarkistetaan onko selaimen local storagessa user tietoa vanhastaan
  useEffect(() => {
    const userFromLS = localStorage.getItem("user");
    if (userFromLS) {
      setCurrentUser(userFromLS);
    }
  }, []);

  // navbar logout
  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <HashRouter>
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
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
              {/* </ul>
            <ul className="navbar-nav ml-auto"> */}
              {/* Alla ehdollinen renderöinti sen mukaan ollaako kirjautuneen vaiko ei */}
              {!currentUser && (
                <li className="nav-item active">
                  <Link to="/account" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="navbardrop"
                    data-toggle="dropdown"
                  >
                    Logged in
                  </a>
                  <div className="dropdown-menu">
                    <Link to="#" className="dropdown-item" onClick={logout}>
                      Log out
                    </Link>
                    <Link to="/account" className="dropdown-item disabled">
                      Logged in {currentUser}
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <hr />
        {/* prettier-ignore */}
        <Switch>
          <Route exact path="/" component={etusivu} />
          <Route path="/customers" render={props => <CustomerList currentUser={currentUser} {...props} />} />
          <Route path="/products" render={props => <ProductList currentUser={currentUser} {...props} />} />
          <Route path="/users" render={props => <LoginList currentUser={currentUser} {...props} />} />
          <Route path="/account" render={props => <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser}{...props} />} />
          {/* lähetän loginformille propsina currentUser staten ja setCurrentUser-metodin*/}
          <Route path="*" component={notFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Navigaatio;
