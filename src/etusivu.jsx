import React from "react";
import kuva from "./kuva.jpg";

const etusivu = () => {
  return (
    <div className="container">
      <h1>Welcome to React NorthWind Hooks app!</h1>
      <br />
      <img src={kuva} className="kuva" alt="Kuva" />
    </div>
  );
};

export default etusivu;
