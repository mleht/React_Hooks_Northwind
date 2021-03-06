import axios from "axios";

const url = "https://localhost:5001/nw/authentication";

const authenticate = (userForAuth) => {
  const request = axios.post(url, userForAuth);
  return request.then((response) => response.data);
};

export default { authenticate };
