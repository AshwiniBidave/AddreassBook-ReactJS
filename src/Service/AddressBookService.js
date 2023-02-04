/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';


class AddressbookService {
    baseUrl = 'http://localhost:8080/AddressBook';

    

    addPerson = (person) => {

        return axios.post(`${this.baseUrl}/create`, person);
    }

    getAllContacts = () => {
        return axios.get(`${this.baseUrl}/getall`);
    }

    delete = (personId) => {
      return axios.delete(`${this.baseUrl}/delete/${personId}`)
    }

    getContactById = (personId) => {
        return axios.get(`${this.baseUrl}/get/${personId}`)
    }

    updatePerson = (personId, person) => {

        return axios.put(`${this.baseUrl}/update/${personId}`, person)
    }
}


export default new AddressbookService();


