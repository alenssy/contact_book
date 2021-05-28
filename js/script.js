export const contactURL = `https://6099728e99011f0017140ecc.mockapi.io/api/vi/contacts`,
    contactList = document.querySelector('#contactList');

import {Form} from './form.js';

Form.get();
Form.getList();

let createContact = new Form('#contactForm');
