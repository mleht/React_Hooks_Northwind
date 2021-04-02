import React from "react";
import "../App.css";

const Login = ({ login, handleDeleteClick }) => {
  return (
    <>
      <tr>
        <td>{login.userName}</td>
        <td>{login.firstname}</td>
        <td>{login.lastname}</td>
        <td>{login.email}</td>

        <td>
          <button
            className="nappi"
            onClick={() => handleDeleteClick(login.loginId)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Login;
