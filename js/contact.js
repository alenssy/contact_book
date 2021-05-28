import {contactURL, contactList} from './script.js';
import {XHR} from './xhr.js';
import {Form} from './form.js';
import {List} from './list.js';
import {editSvg, saveSvg, deleteSvg} from './SVG.js';

export class Contact{
    constructor(contact){
        this.create(contact);

        this.render();
    }

    create(contact){
        for(let key in contact){
            this[key] = contact[key];
        }
    }

    render(){
        let tbody = contactList.querySelector('tbody');

        let tr = document.createElement('tr'),
            tdBtn = document.createElement(`td`),
			editBtn = document.createElement(`button`),
			saveBtn = document.createElement(`button`),
			deleteBtn = document.createElement(`button`);

        tr.dataset.id = this.id;

        editBtn.innerHTML = `${editSvg}`;
		editBtn.classList.add('btn__edit');
		editBtn.addEventListener(`click`,this.edit.bind(this));

		saveBtn.innerHTML = `${saveSvg}`;
		saveBtn.classList.add('btn__save');
		saveBtn.disabled = true;
		saveBtn.addEventListener('click',this.save.bind(this));

		deleteBtn.innerHTML = `${deleteSvg}`;
		deleteBtn.classList.add('btn__delete');
		deleteBtn.addEventListener(`click`,this.delete.bind(this));

        tr.classList.add('contact__list--item');
        tdBtn.classList.add('input__contact--container');
        tdBtn.classList.add('options__container');

        tr.innerHTML = `<td class="input__contact--container"><input type="text" value="${this.name}" class="input__contact--data" disabled></td>
        <td class="input__contact--container"><input type="text" value="${this.surname}" class="input__contact--data" disabled></td>
        <td class="input__contact--container"><input type="text" value="${this.phone}" class="input__contact--data" disabled></td>`;
         
        tdBtn.append(editBtn,saveBtn,deleteBtn);
        tr.append(tdBtn);
        tbody.append(tr);
    }

    delete(){
		XHR.xhr(`${contactURL}/${this.id}`,`DELETE`)
			.then(
				() => {
                    Form.get(); 
                    List.getCount();
                }
			)
	}

    edit(){
		let tr = contactList.querySelector(`tr[data-id="${this.id}"]`),
			inputs = tr.querySelectorAll(`input`),
			saveBtn = tr.querySelector(`button.btn__save`);

		inputs.forEach(input => {
            input.disabled = false;
		    input.focus();
        })
        
		saveBtn.classList.add(`btn__save--enable`);
		saveBtn.disabled = false;
	}

    save(){
		let tr = document.querySelector(`tr[data-id="${this.id}"]`),
			inputs = tr.querySelectorAll(`input`);

            let contactData = {
                name: '',
                surname: '',
                phone: ''
            };
    
            inputs.forEach((input, index) => contactData[Object.keys(contactData)[index]] = input.value)

		XHR.xhr(`${contactURL}/${this.id}`,`PUT`, contactData)
			.then(
				() => Form.get()
			)
	}
}