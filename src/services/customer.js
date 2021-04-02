import axios from "axios";

const baseUrl = "https://localhost:5001/nw/customer";

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
// request vakioon axios.get ja url parametriksi
// return palauttaa requestin arvon ja se sisältää responsen (vastauksen)
// Ei otetata koko responsea vaan otetaan response.data
// Token liitetään metodeissa mukaan pyyntöön config objektin muodossa

// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

const create = (newCustomer) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, newCustomer, config); // ensimmäinen parametri mihin lähetetään ja toinen mitä lähetetään (pyynnön body-osassa)
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};
// tätä kutsutaan customerservice.remove ja tälle lähetetään id. Sitten Axios metodi Delete ja sille url apiin sisältäen id:n

const update = (changedCustomer) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.put(
    `${baseUrl}/${changedCustomer.customerId}`,
    changedCustomer,
    config
  ); // parametreina url id:llä sekä koko customer olio
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update, setToken };
