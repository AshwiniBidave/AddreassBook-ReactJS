
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import "./addressbookform.css";
import AddressBookService from "../Service/AddressBookService";


export default function AddressBookForm(props) {
    
    const [formValue, setForm] = useState({
    
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        isUpdate: false,
    });

    const onReset = () => {
        setForm({
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            email: "",
            isUpdate: false,
       
        });
    };

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }

    const params = useParams();
    useEffect(() => {
        console.log(params.id)
        if (params.id) {
            getPersonId( params.id)
            console.log(params.id)
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const getPersonId = (personId) => {
        console.log("Data Found")
        AddressBookService.getContactById(personId).then((data) => {
            let obj = data.data.data;
            console.log(obj);
            setData(obj);
        });
    };

    const setData = (obj) => {
        console.log()
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            phone: obj.phone,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zip: obj.zip,
            email:obj.email,
            isUpdate: true,
        });
    };

    const save = async (event) => {
        event.preventDefault();

        let object = {
            id: formValue.id,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            phone: formValue.phone,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zip: formValue.zip,
            email:formValue.email
        };

        if (formValue.isUpdate) {
            AddressBookService.updatePerson(params.id, object)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                        this.props.history.push("");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            AddressBookService.addPerson(object).then((response) => {
                console.log(response);
                alert("Data Added!!")
            })
        }
        
    }
    return (
        <div>

                <form className="form" action="#" onSubmit={save}>
                <div className="form-head">
                      Address Book
                  </div>

                    <label className="label text" htmlFor="name">First Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="firstName" name="firstName" placeholder="Enter  First Name"
                            onChange={onNameChange} value={formValue.firstName} required />
                        <error-output className="fullname-error" htmlFor="name"></error-output>
                    </div>
                    <label className="label text" htmlFor="name">Last Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="lastName" name="lastName" placeholder="Enter Last Name"
                            onChange={onNameChange} value={formValue.lastName} required />
                        <error-output className="fullname-error" htmlFor="name"></error-output>
                    </div>


                    <label className="label text" htmlFor="phone">Phone Number</label>
                    <div className="row-content">
                        <input className="input" type="text" id="phone" name="phone" placeholder="Enter Phone Number"
                            onChange={onNameChange} value={formValue.phone} required />
                        <error-output className="phone-error" htmlFor="number"></error-output>
                    </div>
                        <label className="label text" htmlFor="email"> Email </label>
                        <div className="row-content">

                        <input className="input" type="text" name="email" id="email" placeholder="Enter email"
                            value={formValue.email}
                            onChange={onNameChange}
                            required
                        />
                        <error-output className="email-error" htmlFor="text" />`
                    </div>

 

                    <label className="label text" htmlFor="address">Address</label>
                    <div className="row-content">
                        <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address"
                            onChange={onNameChange} value={formValue.address} ></textarea>
                    </div>

                    <div className="row">
                        <div className="input-content">
                            <label className="label text" htmlFor="city">City</label>
                            <div className="row-content">
                                <select className="input" name="city" id="city" value={formValue.city} onChange={onNameChange} >
                                    <option value="">City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Solapur">Solapur</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Nagpur">Nagpur</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-content">
                            <label className="label text" htmlFor="state">State</label>
                            <div className="row-content">
                                <select className="input" name="state" id="state" onChange={onNameChange} value={formValue.state}>
                                    <option value="">State</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-content">
                            <label className="label text" htmlFor="zip">ZipCode</label>
                            <div className="row-content">
                                <input className="input" type="number" id="zip" name="zip" placeholder="Enter Zip Code"
                                    onChange={onNameChange} value={formValue.zip} required />
                                <error-output className="zip-error" htmlFor="number"></error-output>
                            </div>
                        </div>
                    </div>
                    <div className="buttonParent">
                        <div className="add-reset">
                            <button type="submit" className="button addButton" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>

                            <button type="reset" className="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}
