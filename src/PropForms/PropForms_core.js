//@flow

import { Settings } from './PropForms_types';
import PropForms_public from './PropForms_public';

class PropForms_core {

	form: HTMLFormElement;
	fields: HTMLCollection<HTMLElement>;
	disabled: boolean;
	options: Settings;

	constructor(form: HTMLFormElement, options: Settings): PropForms_public {

		this.form = form;
		this.fields = form.elements;
		this.disabled = false;
		this.options = options;

		this.bindEvents();

		return new PropForms_public(this);

	}

	bindEvents() {



	}

	disable(disable: boolean = true): void {

		this.disabled = disable;
		this.form.style.opacity = (disable === false ? '1.0' : '0.3');

		for(let i = 0, l = this.fields.length; i < l; i++) {

			if(disable === false) {

				this.fields[i].removeAttribute('disabled');
				continue;

			}

			this.fields[i].setAttribute('disabled', 'true');

		}

	}

}

export default PropForms_core;