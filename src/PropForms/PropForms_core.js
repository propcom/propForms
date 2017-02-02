import PropForms_public from './PropForms_public';

class PropForms_core {

	constructor(form, options) {

		this.form = form;
		this.fields = form.elements;
		this.disabled = false;
		this.options = options;

		this.bindEvents();

		return new PropForms_public(this);

	}

	bindEvents() {



	}

	disable(disable = true) {

		this.disabled = disable;
		this.form.style.opacity = (disable === false ? null : 0.3);

		for(let i = 0, l = this.fields.length; i < l; i++) {

			if(disable === false) {

				this.fields[i].removeAttribute('disabled');
				continue;

			}

			this.fields[i].setAttribute('disabled', `${disable}`);

		}

	}

}

export default PropForms_core;