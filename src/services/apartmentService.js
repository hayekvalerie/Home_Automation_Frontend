import axios from 'axios'
import { baseUrl } from '../shared/baseUrl';

const deleteApartment = (apartmentId) => {
    axios.delete(baseUrl + 'apartments/' + apartmentId)
    .then(res => console.log(res));
}

const updateApartment = (apartmentId, user) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'apartments/' + apartmentId, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(res => console.log(res));
}

const removeUserFromApartments = userId => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'apartments/' + userId, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(res => console.log(res));
}

export {deleteApartment, updateApartment, removeUserFromApartments}