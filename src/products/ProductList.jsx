import React from "react";
import "../App.css";

const LoginList = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <div className="container">
        <h1>Please Log in to view content</h1>
      </div>
    );
  }
  if (currentUser) {
    return (
      <div className="container">
        <h1>Lorem Ipsum</h1>
      </div>
    );
  }
};

export default LoginList;
