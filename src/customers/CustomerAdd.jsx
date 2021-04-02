import React, { useState } from "react";
import "../App.css";
import CustomerService from "../services/customer";

// prettier-ignore
const CustomerAdd = ({ setLisäystila, setCustomers, customers, setMessage, setShowMessage, setIsPositive }) => {
  // State määritykset

  const [newCustomerId, setNewCustomerId] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactTitle, setNewContactTitle] = useState("");

  const [newCountry, setNewCountry] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");

  const [newPostalCode, setNewPostalCode] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFax, setNewFax] = useState("");

  // Lomakkeen onSubmit tapahtumankäsittelijä

  const submitCustomer = (event) => {
    event.preventDefault(); //  preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    // Luodaan JS-asiakasobjekti, johon haetaan state:sta tiedot
    var newCustomer = {
      customerId: newCustomerId,
      companyName: newCompanyName,
      contactName: newContactName,
      contactTitle: newContactTitle,
      country: newCountry,
      address: newAddress,
      city: newCity,
      postalCode: newPostalCode,
      phone: newPhone,
      fax: newFax,
    };

    const jwt = localStorage.getItem('token')  // token localstoragesta muuttujaan
    CustomerService.setToken(jwt)  // lähetetään token muuttuja /services/customers tiedostoon
    
    CustomerService // services/customer tiedostosta axios create eli post-pyyntö sis. tokenin
    .create(newCustomer)
    .then(response => {

        if (response.status === 200) {
            // setCustomers(customers.concat(newCustomer))  // setCustomers & customers saatiin propsina customerslist.jsx
            // setCustomers hookilla otetaan nykyinen customers-tila ja liitetään (concat) siihen newCustomer eli lisätty asiakas. Eli Customers state päivittyy tässä 
            setMessage(`Lisätty ${newCustomer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000
            ) 
        }

    })
    .catch(error => {
        setMessage(`Error: ${error}`)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        }, 7000
        )
    })

setLisäystila(false)

}
    

  // Komponentti palauttaa käyttöliittymään form elementin

  return (
    <div>
      {/* prettier-ignore */}
      <form onSubmit={submitCustomer}>

        {/* inputien tapahtumankäsittelijät on funktiota, jotka saa parametrikseen
        input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
        <div>
            <input id="id5" type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" required
                onChange={({ target }) => setNewCustomerId(target.value)} />
        </div>
        <div>
            <input id="comp" type="text" value={newCompanyName} placeholder="Company name"
                onChange={({ target }) => setNewCompanyName(target.value)} />
        </div>
        <div>
            <input type="text" value={newContactName} placeholder="Contact name"
                onChange={({ target }) => setNewContactName(target.value)} />
        </div>
        <div>
            <input type="text" value={newContactTitle} placeholder="Contact title"
                onChange={({ target }) => setNewContactTitle(target.value)} />
        </div>
        <div>
            <input type="text" value={newAddress} placeholder="Address"
                onChange={({ target }) => setNewAddress(target.value)} />
        </div>
        <div>
            <input type="text" value={newCity} placeholder="City"
                onChange={({ target }) => setNewCity(target.value)} />
        </div>
        <div>
            <input type="text" value={newPostalCode} placeholder="Postal code" maxLength="10"
                onChange={({ target }) => setNewPostalCode(target.value)} />
        </div>
        <div>
            <input type="text" value={newCountry} placeholder="Country" maxLength="15"
                onChange={({ target }) => setNewCountry(target.value)} />
        </div>
        <div>
            <input type="text" value={newPhone} placeholder="Phone"
                onChange={({ target }) => setNewPhone(target.value)} />
        </div>
        <div>
            <input type="text" value={newFax} placeholder="Fax"
                onChange={({ target }) => setNewFax(target.value)} />
        </div>

        <button type="submit" style={{ background: 'green' }}>Create</button>

        <button onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
            Cancel</button>
    </form>
    </div>
  );
};

export default CustomerAdd;
