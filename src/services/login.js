import axios from "axios";

const baseUrl = "https://localhost:5001/nw/logins";

let token = null;
// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = (newLogin) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, newLogin, config);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

const update = (changedLogin) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.put(`${baseUrl}/${changedLogin.loginId}`, changedLogin, config);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update, setToken };
