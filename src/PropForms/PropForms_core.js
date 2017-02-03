//@flow

import PropForms_public from './PropForms_public';
import PropForms_util from './PropForms_util';

class PropForms_core {

	form: HTMLFormElement;
	fields: HTMLCollection<HTMLElement>;
	requiredFields: NodeList<HTMLElement>;
	errors: Errors;
	disabled: boolean;
	options: Settings;

	constructor(form: HTMLFormElement, options: Settings): PropForms_public {

		this.form = form;
		this.fields = form.elements;
		this.disabled = false;
		this.options = options;

		this.bindEvents();
		this.setRequiredFields();

		return new PropForms_public(this);

	}

	bindEvents(): void {

		this.form.addEventListener('submit', (e: Event) => {

			this.submit(e);

		});

	}

	setRequiredFields(): void {

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

	validate(): boolean {

		let passing: boolean = true;

		this.errors = {};

		for(let i: number = 0, l: number = this.requiredFields.length; i < l; i++) {

			const field: HTMLElement = this.requiredFields[i],
				valid: boolean = this.validateField(field);

			if(valid === false) {

				passing = false;

			}

		}

		return passing;

	}

	processError(field: HTMLTextAreaElement | HTMLInputElement | HTMLTextAreaElement, code: number, passing: boolean, message: string): ?FieldError {

		if(passing === true) {

			return null;

		}

		return {

			code: code,
			element: field,
			name: field.name,
			message: message,
			type: field.type

		}

	}

	fieldError(field: HTMLTextAreaElement | HTMLInputElement | HTMLTextAreaElement, error: ?FieldError): void {

		if(!error) {

			return;

		}

		this.errors[field.name] = error;

		const event = PropForms_util.createEvent('fieldError', error);

		PropForms_util.dispatchEvent({

			name: 'fieldError',
			event: event,
			element: this.form

		});

	}

	validateField(field: HTMLElement): boolean {

		let passing: boolean = true,
			error: ?FieldError;

		if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {

			if(this.options.minLengths[field.type]) {

				const requiredLength = this.options.minLengths[field.type];
				const message = this.options.messages[1].replace(/{(.*?)}/g, String(requiredLength));

				passing = field.value.length >= requiredLength;
				error = this.processError(field, 1, passing, message);

			}

			switch(field.type) {

				case 'email':

					const regEx = /^([^\s\\]+)@((\[[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

					passing = regEx.test(field.value);
					error = this.processError(field, 2, passing, this.options.messages[2]);

					break;

			}

			this.fieldError(field, error);

		}

		return passing;

	}

	submit(e: Event): void {

		e.preventDefault();

		console.log("submitted");

		if(this.validate() === true) {

			console.log("SUCCESS");

		} else {

			const event: ?Event = PropForms_util.createEvent('error', {

				form: this.form,
				errors: this.errors

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