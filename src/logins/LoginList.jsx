import React, { useState, useEffect } from "react";
import "../App.css";
import LoginService from "../services/login";
import Login from "./Login";
import LoginAdd from "./LoginAdd";
import Message from "../Message";

const LoginList = ({ currentUser }) => {
  const [logins, setLogins] = useState([]); // taulukollinen login olioita
  const [lisäysTila, setLisäystila] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // token localstoragesta muuttujaan
    LoginService.setToken(token); // lähetetään token muuttuja /services/login tiedostoon
    LoginService.getAll().then((data) => {
      setLogins(data);
      console.log(data);
    });
  }, [lisäysTila]);

  // Tämä ajetaan kun ollaan poistamassa käyttäjää
  const handleDeleteClick = (id) => {
    //Kaivetaan esiin koko login olio jotta alertissa voidaan näyttää username id:n sijaan
    const login = logins.find((login) => login.loginId === id);

    // Poiston varmistus kyselyikkuna
    const confirm = window.confirm(
      `Are you sure you want to permanently remove: ${login.userName}?`
    );

    if (confirm) {
      const token = localStorage.getItem("token"); // token localstoragesta muuttujaan
      LoginService.setToken(token); // lähetetään token muuttuja /services/login tiedostoo
      LoginService.remove(id)
        .then((response) => {
          if (response.status === 200) {
            // Poistetaan login statesta
            setLogins(logins.filter((filtered) => filtered.loginId !== id));

            setMessage(`${login.userName} deleted!`);
            setIsPositive(true);
            setShowMessage(true);
            // window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert

            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }
        })

        .catch((error) => {
          console.log(error);
          setMessage(`Error: ${error}`);
          setIsPositive(false);
          setShowMessage(true);

          setTimeout(() => {
            setShowMessage(false);
          }, 7000);
        });
    }
  };

  // RETURN ON AINA SE OSA JOKA RENDERÖIDÄÄN RUUDULLE

  // Jos logineja ei ole ehtinyt tulla kannasta stateen
  if (!currentUser) {
    return (
      <div className="container">
        <h1>Please Log in to view content</h1>
      </div>
    );
  }
  if (currentUser) {
    if (logins.length === 0) {
      return (
        <div className="container">
          {showMessage && <Message message={message} isPositive={isPositive} />}
          <h1>Users</h1>
          <p>Loading...</p>
        </div>
      );
    }

    // Jos statessa on jo kannasta saapuneet loginit ja lisäystilakin on pois päältä
    if (!lisäysTila && logins.length > 0) {
      return (
        <div className="container">
          {showMessage && <Message message={message} isPositive={isPositive} />}
          <h1>
            <nobr> Users</nobr>

            <button className="nappi" onClick={() => setLisäystila(true)}>
              Add new
            </button>
          </h1>

          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {logins.map((login) => (
                <Login
                  key={login.loginId}
                  login={login}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (lisäysTila) {
      return (
        <LoginAdd
          setLisäystila={setLisäystila}
          logins={logins}
          setLogins={setLogins}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          setIsPositive={setIsPositive}
        />
      );
    }
  }
};
export default LoginList;
