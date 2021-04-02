import "./App.css";

let tyyli = "";

const Message = ({ message, isPositive }) => {
  if (isPositive === true) {
    tyyli = "alert alert-success";
  } else {
    tyyli = "alert alert-danger";
  }

  return <div className={tyyli}>{message}</div>;
};

export default Message;
