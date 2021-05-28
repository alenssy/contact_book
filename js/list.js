import {contactURL,contactList} from './script.js';
import {XHR} from './xhr.js';
import {personSvg, optionsSvg} from './SVG.js';

export class List{
    constructor(contacts){
        this.contacts = contacts;

        this.render();
    }

    render(){
        let thead = contactList.querySelector('thead');
        let btnAdd = contactList.querySelector('.btn__add');

        btnAdd.addEventListener('click', this.addContact.bind(this));

        let tr = document.createElement('tr');

        tr.innerHTML += `<td class="list__headers">${Object.keys(this.contacts[0])[1]}</td>
                        <td class="list__headers">${Object.keys(this.contacts[0])[2]}</td>
                        <td class="list__headers">${Object.keys(this.contacts[0])[3]}</td>
                        <td class="options__container">${optionsSvg}</td>`;

        thead.append(tr);
    }

    addContact(){
        let formContainer = document.querySelector('.form__container');

        formContainer.classList.add('show');
    }

    static getCount(){
        return XHR.xhr(contactURL)
            .then(
                data => {
                    let tfoot = contactList.querySelector('tfoot');
                    tfoot.innerHTML = `<td colspan="3" class="contact__counter">Active contacts: ${data.length} ${personSvg}</td>`;
                    return data;
                }
            )
    }
}