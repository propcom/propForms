//@flow

import PropForms_util from './PropForms_util';
import PropForms_validate from './PropForms_validate';
import PropForms_public from './PropForms_public';

class PropForms_core {

	form: HTMLFormElement;
	fields: HTMLCollection<HTMLElement>;
	requiredFields: NodeList<HTMLElement>;
	disabled: boolean;
	options: Settings;
	validation: PropForms_validate;

	constructor(form: HTMLFormElement, options: Settings): PropForms_core {

		this.form = form;
		this.fields = form.elements;
		this.disabled = false;
		this.options = options;

		this._bindEvents();
		this._setRequiredFields();

		this.validation = new PropForms_validate({
			requiredFields: this.requiredFields,
			options: this.options,
			form: this.form
		});

		return new PropForms_public(this);
	}

	_bindEvents(): void {

		this.form.addEventListener('submit', (e: Event) => {
			this.submit(e);
		});
	}

	_setRequiredFields(): void {
		// Prevent HTML5 Validation
		this.form.setAttribute('novalidate', 'true');
		this.requiredFields = this.form.querySelectorAll('*[required]');
	}

	disable(disable: boolean = true): void {

		const eventName: string = this.disable ? 'disable' : 'enable';

		this.disabled = disable;
		this.form.style.opacity = (disable === false ? '1.0' : '0.3');

		for(let i = 0, l = this.fields.length; i < l; i++) {

			if(disable === false) {
				this.fields[i].removeAttribute('disabled');
				continue;
			}

			this.fields[i].setAttribute('disabled', 'true');
		}

		const event: ?Event = PropForms_util.createEvent(eventName, {
			form: this.form
		});

		PropForms_util.dispatchEvent({
			name: eventName,
			event: event,
			element: this.form
		});
	}

	submit(e: Event): void {

		e.preventDefault();

		console.log("submitted");

		if(this.validation.validate() === true) {
			console.log("SUCCESS");
		} else {

			const event: ?Event = PropForms_util.createEvent('error', {
				form: this.form,
				errors: this.validation.errors
			});

			PropForms_util.dispatchEvent({
				name: 'error',
				event: event,
				element: this.form
			});

			console.log("FAILURE");
		}
	}
}

export default PropForms_core;