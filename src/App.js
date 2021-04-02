import React, { useState } from "react";
import "./App.css";
import CustomerList from "./CustomerList";
import Message from "./Message";

// Tämä komponentti ei enää käytössä vaan korvattu navigaatiolla

const App = () => {
  // ennen alku oli muodossa: function App() {
  // tässä esitellään vakiona const ja vakion arvo on funktio

  // const [luku, setLuku] = useState(0); // Tila sisältää yhden asian eli tässä luku, alkuarvo 0 ja muutetaan setLuku-funktiolla
  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "white" }}>Northwind</h1>
      </header>
      <hr />

      {showMessage && <Message message={message} isPositive={isPositive} />}

      <CustomerList
        setShowMessage={setShowMessage}
        setIsPositive={setIsPositive}
        setMessage={setMessage}
      />

      {/*<Laskuri luku={luku} setLuku={setLuku} />*/}
      {/* propsin nimi luku ja välittää const luku hookista / propsin nimi setLuku ja välittää setLuku-funktion*/}
    </div>
  );
};

export default App;
