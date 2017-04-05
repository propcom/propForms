import PropForms_error from './model/PropForms_error';
import PropForms_success from './model/PropForms_success';
import PropForms_util from './PropForms_util';

class PropForms_validate {

	errors: Errors;
	success: Success;
	options: Settings;
	form: HTMLFormElement;
	requiredFields: NodeList<HTMLElement>;

	constructor(details = {}) {

		this.errors = {};
		this.success = {};
		this.requiredFields = details.requiredFields;
		this.options = details.options;
		this.form = details.form;
	}

	_markError(field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement): void {

		PropForms_util.addClass(field, this.options.errorClass);

		if(typeof this.options.parent !== undefined) {
			let parent = PropForms_util.findParent(field, this.options.parent);

			if(typeof parent !== 'undefined') {
				PropForms_util.addClass(parent, this.options.errorClass);
			}
		}
	}

	_markPass(field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement): void {

		PropForms_util.removeClass(field, this.options.errorClass);

		if(typeof this.options.parent !== undefined) {
			let parent = PropForms_util.findParent(field, this.options.parent);

			if(typeof parent !== 'undefined') {
				PropForms_util.removeClass(parent, this.options.errorClass);
			}
		}
	}

	validate(): boolean {

		this.errors = {};
		this.success = {};

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

	_handleValid(field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement) {

		if(typeof this.success[field.name] !== 'undefined') {
			return;
		}

		let set: NodeList<HTMLElement> = this.form.elements[field.name];
		let isSet = typeof set.length !== 'undefined';

		if(isSet) {
			for(let i = 0; i < set.length; i++) {
				this._markPass(set[i]);
			}
		} else {
			this._markPass(field);
		}

		const success = new PropForms_success({
			field: isSet ? undefined : set,
			fields: isSet ? set : undefined,
			parent: isSet ? PropForms_util.findParent(set[0], this.options.parent) : PropForms_util.findParent(field, this.options.parent),
			name: field.name
		});

		this.success[field.name] = success;

		const event = PropForms_util.createEvent('fieldvalid', success);

		PropForms_util.dispatchEvent({
			name: 'fieldvalid',
			event: event,
			element: this.form
		});

	}

	_handleError(error: ?PropForms_error) {

		if(typeof error.fields !== 'undefined') {
			for(let i = 0; i < error.fields.length; i++) {
				this._markError(error.fields[i]);
			}
		} else {
			this._markError(error.field);
		}

		const event = PropForms_util.createEvent('fielderror', error);

		PropForms_util.dispatchEvent({
			name: 'fielderror',
			event: event,
			element: this.form
		});
	}

	_handleField(field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement, error: ?PropForms_error): void {

		if(typeof this.errors[field.name] !== 'undefined') {
			return;
		}

		if(typeof error !== 'undefined' && error.passing !== true) {
			this.errors[field.name] = error;
		}

		if(typeof this.errors[field.name] === 'undefined') {

			this._handleValid(field);
			return;
		}

		this._handleError(error);
	}

	_validateField(field: HTMLElement): boolean {

		let error: PropForms_error;

		if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {

			if(this.options.minLengths[field.type]) {
				error = this._lengthValidation(field);
			}

			if(field.type === 'email' || field.name.search(/email/g) >= 0) {
				error = this._emailValidation(field);
			}

			switch(field.type) {
				case 'checkbox':
					error = this._checkboxValidation(field);
					break;

				case 'radio':
					error = this._radioValidation(field);
					break;
			}

			if(this.options.validation[field.name]) {
				error = this._customValidation(field);
			}

			this._handleField(field, error);

			if(typeof error === 'undefined') {
				return;
			}

			return error.passing;

		} else {
			return true
		}
	}

	_lengthValidation(field): PropForms_error {

		const requiredLength = this.options.minLengths[field.type];
		const message = this.options.messages[1].replace(/{(.*?)}/g, String(requiredLength));

		return new PropForms_error({
			message: message,
			code: 1,
			field: field,
			name: field.name,
			type: field.type
		}, field.value.length >= requiredLength);
	}

	_emailValidation(field): PropForms_error {

		const regEx = /^([^\s\\]+)@((\[[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,}|[0-9]{1,3})(\]?)$/;

		return new PropForms_error({
			message: this.options.messages[2],
			code: 2,
			field: field,
			name: field.name,
			type: field.type
		}, regEx.test(field.value));
	}

	_checkboxValidation(field): PropForms_error {

		return new PropForms_error({
			message: this.options.messages[3],
			code: 3,
			field: field,
			name: field.name,
			type: field.type
		}, field.checked);
	}

	_radioValidation(field): PropForms_error {

		let set: NodeList<HTMLElement> = this.form.elements[field.name];

		if(typeof this.errors[field.name] !== 'undefined') {
			return;
		}

		for(let i = 0; i < set.length; i++) {
			if(set[i].checked === true) {
				return
			}
		}

		return new PropForms_error({
			message: this.options.messages[4],
			code: 4,
			fields: set,
			name: field.name,
			type: field.type
		}, false);
	}

	serverValidation(element: HTMLElement) {

		let field: HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement | NodeList<HTMLElement>;
		let error: ?PropForms_error;

		if(element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {

			field = this.form.elements[element.name];

			error = new PropForms_error({
				message: this.options.messages[5],
				code: field.length > 1 ? field : undefined,
				field: field.length > 1 ? undefined : field,
				name: field.name,
				type: field.type
			});
		}

		this._handleField(field, error);
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
			PropForms_util.log('Your custom validation method for "' + field.name + '" does not return true or false, it will always validate as true.', 'warn');
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