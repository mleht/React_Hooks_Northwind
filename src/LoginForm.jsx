import React, { useState } from "react";
import "./App.css";
import AuthService from "./services/auth";
import Message from "./Message";

const LoginForm = ({ currentUser, setCurrentUser }) => {
  // Login lomakkeen kenttiä vastaavat statet
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Statet Login aiheisesta Messagen näyttämisestä
  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(true);
  const [message, setMessage] = useState("");

  // Login napin painallus ajaa tämän:
  const authenticate = (event) => {
    event.preventDefault();

    const userForAuth = {
      username: username,
      password: password,
    };

    AuthService.authenticate(userForAuth) // Käytetään AuthServicen metodia authenticate()
      .then((response) => {
        // console.log(response);

        localStorage.setItem("user", response.userName); // talletetaan selaimen localstorageen
        localStorage.setItem("token", response.token); // talletetaan selaimen localstorageen

        // Asetetaan käyttäjänimi currentUser -stateen, jota säilytetään navigaatio.js:ssä
        setCurrentUser(response.userName);

        setMessage(`Welcome ${response.userName}`); // ilmoitus käyttäen Message-komponenttia
        setIsPositive(true);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false); // Message pois 4s viiveen jälkeen:
        }, 4000);
      })

      .catch((error) => {
        setMessage(`${error}`);
        setIsPositive(false); // Erroreille punainen viesti
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false); // Message pois 4a viiveen jälkeen
        }, 4000);
      });
    emptyFields();
  };

  // Tämä funktio ajetaan kun tehdään Logout
  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);

    // Message
    setMessage("You have been successfully logged out");
    setIsPositive(true);
    setShowMessage(true);

    // Message pois pienen viiveen jälkeen:
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  // Empty napin painallus ajaa tämän
  const emptyFields = () => {
    setPassword("");
    setUsername("");
  };

  // Jos navigaatio.js:n useEffect funktio ei löydä local storagesta käyttäjää, tilanne on tämä:
  if (!currentUser) {
    return (
      <div className="container">
        <h1>Login</h1>
        <br />
        {showMessage && <Message message={message} isPositive={isPositive} />}
        <form className="login-form" onSubmit={authenticate}>
          <input
            className="login-input"
            value={username}
            type="text"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <input
            className="login-input"
            value={password}
            type="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  }
  // Muussa tapauksessa:
  else if (currentUser) {
    return (
      <div className="container">
        <h1>Logged in {currentUser}</h1>
        <br />
        {showMessage && <Message message={message} isPositive={isPositive} />}
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
};

export default LoginForm;
