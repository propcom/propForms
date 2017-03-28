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

		this.errors = {};

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

	_fieldError(field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement, error: ?PropForms_error): void {

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

		let error: PropForms_error;

		if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {

			if(this.options.minLengths[field.type]) {

				const requiredLength = this.options.minLengths[field.type];
				const message = this.options.messages[1].replace(/{(.*?)}/g, String(requiredLength));

				error = new PropForms_error({
					message: message,
					code: 1,
					field: field,
					name: field.name,
					type: field.type
				}, field.value.length >= requiredLength);
			}

			if(field.type === 'email' || field.name.search(/email/g) >= 0) {

				const regEx = /^([^\s\\]+)@((\[[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

				error = new PropForms_error({
					message: this.options.messages[2],
					code: 2,
					field: field,
					name: field.name,
					type: field.type
				}, regEx.test(field.value));

			}

			if(field.type === 'checkbox') {

				error = new PropForms_error({
					message: this.options.messages[3],
					code: 3,
					field: field,
					name: field.name,
					type: field.type
				}, field.checked);
			}

			if(this.options.validation[field.name]) {
				error = this._customValidation(field);
			}

			this._fieldError(field, error);

			return error.passing;

		} else {
			return true
		}
	}

	_customValidation(field): PropForms_error {

		let passing: boolean = true;

		const code = this.options.validation[field.name].code;
		const message = this.options.messages[code] ? this.options.messages[code] : this.options.messages[0];

		if(typeof this.options.validation[field.name].method === 'function') {
			passing = this.options.validation[field.name].method.bind(field)();
		} else {
			passing = field.value.length > this.options.minLengths[field.type]
		}

		if(typeof passing !== 'boolean') {
			passing = true;
			PropForms_util.log('Your custom validation method for "'+field.name+'" does not return true or false, it will always validate as true.', 'warn');
		}

		return new PropForms_error({
			message: message,
			code: code,
			field: field,
			name: field.name,
			type: field.type
		}, passing);
	}
}

export default PropForms_validate;