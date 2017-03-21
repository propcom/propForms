import PropForms_error from './PropForms_error';
import PropForms_util from './PropForms_util';

class PropForms_validate {

	errors: Errors;
	options: Settings;
	form: HTMLFormElement;
	requiredFields: NodeList<HTMLElement>;

	constructor(details = {}) {

		this.errors = {};
		this.requiredFields = details.requiredFields;
		this.options = details.options;
		this.form = details.form;
	}

	validate(): boolean {

		let passing: boolean = true;

		for(let i: number = 0, l: number = this.requiredFields.length; i < l; i++) {

			const field: HTMLElement = this.requiredFields[i],
				  valid: boolean = this._validateField(field);

			if(valid === false) {
				passing = false;
			}
		}

		return passing;
	}

	_fieldError(field: HTMLTextAreaElement | HTMLInputElement | HTMLTextAreaElement, error: ?PropForms_error): void {

		if(error.passing === true) {
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

	_validateField(field: HTMLElement): boolean {

		let passing: boolean = true,
			error: ?FieldError;

		if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {

			if(this.options.minLengths[field.type]) {

				const requiredLength = this.options.minLengths[field.type];
				const message = this.options.messages[1].replace(/{(.*?)}/g, String(requiredLength));

				passing = field.value.length >= requiredLength;

				error = new PropForms_error({
					message: message,
					code: 1,
					field: field,
					name: field.name,
					type: field.type
				}, passing);

			}

			switch(field.type) {

				case 'email':
					const regEx = /^([^\s\\]+)@((\[[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

					passing = regEx.test(field.value);

					error = new PropForms_error({
						message: this.options.messages[2],
						code: 2,
						field: field,
						name: field.name,
						type: field.type
					}, passing);

					break;
			}

			if(this.options.validation[field.name]) {

				const code = this.options.validation[field.name].code;
				const message = this.options.messages[code] ? this.options.messages[code] : this.options.messages[0];

				if(typeof this.options.validation[field.name].method === 'function') {
					passing = this.options.validation[field.name].method.bind(field)();
				}

				error = new PropForms_error({
					message: message,
					code: code,
					field: field,
					name: field.name,
					type: field.type
				}, passing);
			}

			this._fieldError(field, error);
		}

		return passing;
	}

}

export default PropForms_validate;