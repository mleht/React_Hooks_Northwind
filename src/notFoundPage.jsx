import React from "react";
import { Link } from "react-router-dom";

const notFoundPage = () => {
  return (
    <div className="container">
      <h1>Page not found</h1>
      <br />
      <br />
      <Link to="/">Front page</Link>
    </div>
  );
};

export default notFoundPage;
