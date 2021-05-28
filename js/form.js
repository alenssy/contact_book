import { Contact } from './contact.js';
import {contactURL,contactList} from './script.js';
import {XHR} from './xhr.js';
import {List} from './list.js';

export class Form{
    constructor(el){
        this.el = document.querySelector(el);

        this.el.addEventListener('submit', this.submit.bind(this));
    }

    async submit(e){
        e.preventDefault();

        let inputs = this.el.querySelectorAll('input');

        let contactData = {
            name: '',
            surname: '',
            phone: ''
        };

        inputs.forEach((input, index) => {
            contactData[Object.keys(contactData)[index]] = input.value;

            input.value = ``;
        })

        this.add(contactData);

    }

    async add(contactData){
        let newContact = await XHR.xhr(contactURL,`POST`, contactData);
		await new Contact(newContact);

        let formContainer = document.querySelector('.form__container');

        formContainer.classList.remove('show');
            List.getCount();
    }

    static get(){
        XHR.xhr(contactURL)
            .then(
                data => {
                    let tbody = contactList.querySelector('tbody');
                    tbody.innerHTML = ``;
                    return data;
                }
            )
            .then(
                data => {
                    data.map(contact => new Contact(contact));
                }
            )
    }

    static getList(){
        List.getCount()
            .then(data => new List(data))
    }
}