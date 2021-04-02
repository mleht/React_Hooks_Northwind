import React, { useState } from "react";
import "../App.css";

const Customer = ({ customer, handleDeleteClick, handleEditClick }) => {
  const [näytäEnemmän, setNäytäEnemmän] = useState(false); // usestate-hookki näytäenemmän oletuksena False

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <h4
          // onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)} // kun hiirellä päälle usestate hookki muuttaa tilan vastakkaiseksi = true
          // onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)} // kun hiirellä pois usestate hookki muuttaa tilan vastakkaiseksi = false
          >
            {customer.companyName}
          </h4>
        </div>
        <div className="col-lg-6">
          <button onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
            Details
          </button>

          <button onClick={() => handleDeleteClick(customer.customerId)}>
            Delete
          </button>

          <button onClick={() => handleEditClick(customer)}>Edit</button>
        </div>
      </div>

      {/* jos näytäEnemmän tila on true niin. ko. asiakkaan alle aukeaa table, jossa lisätietoja*/}
      {näytäEnemmän && (
        <div className="col-lg-12">
          <div className="table-responsive-lg">
            <table className="table atable">
              <thead>
                <tr>
                  <th>Contact person</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <tr key={customer.customerId}>
                  <td>{customer.contactName}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
