
import React, { useState,useEffect} from "react";

import { Link, withRouter} from "react-router-dom";

import AddressBookService from "../Service/AddressBookService";
import "./addressbookhome.css";
import Logo from "../assets/logo.png";


import deleteIcons from "../assets/deleteIcons.svg";
import edit  from "../assets/create-black-18dp.svg";



function AddressBookHome (props) {
  const [addressbook, setContacts] = useState([]);

  useEffect(() => {
    fetchContactsApi();
  });

  function fetchContactsApi() {
    AddressBookService.getAllContacts()
      .then((result) => {
        setContacts(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  let deleteContact = (id) => {
    AddressBookService.delete(id);
    fetchContactsApi();
  }

  let updateContact = (id) => {
   /* props.history.push({
      pathname: '/form/'+id,
      state: id
    })*/
    //const contactId=parseInt(id);
    props.history.push(`form/${id}`);

  }  

  return (
    
    <div>

        <div className="main-content">
          <div className="header-content">
            <div className="person-detail-text">Person Details <div className="emp-count">{addressbook.length}</div></div>
            <Link to="/form" className="add-button">
              <img src={Logo} alt="Add User Logo" />
              Add User
            </Link>
          </div>

          <table id="table-display" className="table">
          <thead>
            <tr>
            <th>personId</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Contact</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {addressbook.map((book, index) => {
              return(
                <tr key={`${index}`}>
                <td>{book.personId}</td>
                 <td>{book.firstName}</td>
                  <td>{book.lastName}</td>
                  <td>{book.phone}</td>
                  <td>{book.address}</td>
                  <td>{book.city}</td>
                  <td>{book.state}</td>
                  <td>{book.zip}</td>
                  <td>{book.email}</td>
                  <td>
                    <img
                      name={book.personId}
                      src={deleteIcons}
                      alt="delete"
                      onClick={() => deleteContact(book.personId)}
                    />
                    <Link to={`/form/${book.personId}`}>
                    <img
                      name={book.personId}
                      src={edit}
                      alt="edit"
                      onClick={() =>updateContact(book.personId)}
                    />
                    </Link>
                  </td>
                </tr>
                );
              })}

           </tbody>
          </table>
        </div>
      </div>
    );
}
export default withRouter(AddressBookHome);