//@flow

import PropForms_util from './PropForms_util';
import PropForms_validate from './PropForms_validate';
import PropForms_public from './PropForms_public';
import PropForms_ajax from './PropForms_ajax';

class PropForms_core {

	form: HTMLFormElement;
	fields: HTMLCollection<HTMLElement>;
	requiredFields: NodeList<HTMLElement>;
	disabled: boolean;
	options: Settings;
	validation: PropForms_validate;
	ajax: ?PropForms_ajax;

	constructor(form: HTMLFormElement, options: Settings): PropForms_public {

		this.form = form;
		this.fields = form.elements;
		this.disabled = false;
		this.options = options;

		if(typeof this.options.ajax === 'function') {
			this.ajax = new this.options.ajax({
				form: this.form
			});
		} else {
			this.ajax = null;
		}

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

	submit(e: ?Event): void {

		const valid = this.validation.validate();

		if(valid === true && this.ajax && this.ajax.enabled === true) {
			e && e.preventDefault();

			this.ajax.send();

		} else if(valid === false) {
			e && e.preventDefault();

			const event: ?Event = PropForms_util.createEvent('error', {
				form: this.form,
				errors: this.validation.errors
			});

			PropForms_util.dispatchEvent({
				name: 'error',
				event: event,
				element: this.form
			});
		}
	}
}

export default PropForms_core;