import React, { useState, useEffect } from "react";
import "../App.css";
import CustomerService from "../services/customer";
import Customer from "./Customer";
import CustomerAdd from "./CustomerAdd";
import CustomerEdit from "./CustomerEdit";
import Message from "../Message";

const CustomerList = ({ currentUser }) => {
  const [customers, setCustomers] = useState([]); // useState hook, tyhjä taulukko oletusarvo
  const [näytetäänkö, setNäytetäänkö] = useState(true);
  const [lisäysTila, setLisäystila] = useState(false);
  const [search, setSearch] = useState("");

  const [muokkausTila, setMuokkaustila] = useState(false);
  const [muokattavaCustomer, setMuokattavaCustomer] = useState({}); // oletuksena tyhjä objekti (yksi olio)

  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    CustomerService.setToken(token);
    CustomerService.getAll().then((data) => {
      setCustomers(data);
      //console.log(data);
    });
  }, [näytetäänkö, lisäysTila, muokkausTila]);
  // UseEffect on funktio ja aaltosulkeiden sisällä oleva osuus suoritetaan kun komponenttin ensin latautuu
  // Käytän tekemääni Customerservicea ja siellä customer.js tiedostossa määritettyä getAll()-metodia (joka käyttää Axiosta)
  // Se mitä tämä service palauttaa tulee -then(data "muuttujaan"
  // Sitten käytämme useState-hookin customerssin setCustomers metodia asettamaan palautuneet datat customerssin tilaksi
  // Aaltosulkeiden jälkeen useEffect hookin toisena parametrina on taulukko
  // Sinne vo laittaa staten nimiä (tässä näytetäänkö) ja se aiheuttaa sen, että kun sellainen state muuttuu niin se laukaisi useEffect hookin uudelleenajon

  // Alla hakukentän onChange tapahtumankäsittelijä
  // Tämä toteutuu kun hakukentän sisältö muuttuu (onChange)
  // Se asettaa näytetäänkö tilan trueksi ja search tilan siksi mitä hakukenttään on kirjoitettu
  const handleSearchInputChange = (event) => {
    setNäytetäänkö(true);
    setSearch(event.target.value.toLowerCase());
  };

  const handleDeleteClick = (id) => {
    const customer = customers.find((cust) => cust.customerId === id);
    const confirm = window.confirm(
      `Are you sure you want to permanently remove: ${customer.companyName}`
    );

    if (confirm) {
      const jwt = localStorage.getItem("token"); // Token local storagesta
      CustomerService.setToken(jwt); // lähetetään token muuttuja /services/customers tiedostoon

      CustomerService.remove(id) // services/customer tiedostosta axios delete pyyntö sis. tokenin
        .then((response) => {
          // setCustomers(customers.filter((filtered) => filtered.id !== id)); // Customers tilan pävitys -> customereista tulee filteder nimisiä. Ne joiden id on eri kuin poistettavan saavat jäädä.
          if (response.status === 200) {
            setMessage(`${customer.companyName} deleted!`);
            setIsPositive(true);
            setShowMessage(true);
            setNäytetäänkö(false);

            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }
        })

        .catch((error) => {
          setMessage(`Error: ${error}`);
          setIsPositive(false);
          setShowMessage(true);
          setNäytetäänkö(false);

          setTimeout(() => {
            setShowMessage(false);
          }, 7000);
        });
    }
  };

  // EDIT buttonin tapahtumankäsittelijä saa parametrin customer componentista
  const handleEditClick = (customer) => {
    setMuokattavaCustomer(customer);
    setMuokkaustila(true);
  };

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
        <h1
          title="Show/Hide customers"
          style={{ cursor: "pointer" }}
          onClick={() => setNäytetäänkö(!näytetäänkö)}
        >
          Customers <button onClick={() => setLisäystila(true)}>Add new</button>
        </h1>

        {!lisäysTila && !muokkausTila && (
          <p>
            <br />
            <input
              className="form-control w-25"
              value={search}
              onChange={handleSearchInputChange}
              placeholder="Search (customer name)"
            />
            <br />
          </p>
        )}

        {showMessage && <Message message={message} isPositive={isPositive} />}

        {customers &&
          näytetäänkö === true &&
          lisäysTila === false &&
          muokkausTila === false &&
          // eslint-disable-next-line array-callback-return
          customers.map((customer) => {
            const caseInsensName = customer.companyName.toLowerCase();
            if (caseInsensName.indexOf(search) > -1) {
              return (
                <Customer
                  key={customer.customerId}
                  customer={customer}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              );
            }
          })}

        {!customers && <p>No results</p>}

        {lisäysTila && (
          <CustomerAdd
            setLisäystila={setLisäystila}
            setNäytetäänkö={setNäytetäänkö}
            customers={customers}
            setCustomers={setCustomers}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}

        {muokkausTila && (
          <CustomerEdit
            setMuokkaustila={setMuokkaustila}
            muokattavaCustomer={muokattavaCustomer}
            customers={customers}
            setCustomers={setCustomers}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}
      </div>
    );
  }
};

// customer && = Ehdollinen renderöinti eli jos customers on tosi (eli löytyy) niin silloin renderöidään customers.map(customer)......
// customers.map(customer) = Javascipt MAP-funktio (https://www.w3schools.com/jsref/jsref_map.asp):
// Customers on taulukollinen customers-olioita.
// MAP looppaa ne läpi.
// Sen tuloksena jokaiselta loopin kierrokselta tulee yksi customer.
// Jokaisen customerin kohdalla renderöidään Customer komponentti.
// Sinne välitetään propsi customer joka on yksi customer (mappauksen tuloksena)
// ** customer.companyname pienelllä caseInsensName vakioon
// ** Javascript indexof metodilla katsotaan onko asiakkaan nimessä search tilan sisältämiä merkkejä
// ** Eli jos tila on (kuten oletuksena ) "" tulevat kaikki asiakkaat jne.
// https://www.w3schools.com/jsref/jsref_indexof.asp

export default CustomerList;
