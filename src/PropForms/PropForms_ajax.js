// @flow
import PropForms_util from './PropForms_util';
import PropForms_validate from './PropForms_validate';

class PropForms_ajax {

	enabled: boolean;
	options: Settings;
	validation: PropForms_validate;
	form: HTMLFormElement;

	constructor(details: Object = {}) {
		this.enabled = true;
		this.form = details.form;
		this.validation = details.validation;
		this.options = details.options;
	}

	send(): void {

		const data: FormData | string = this._createData();

		const event = PropForms_util.createEvent('send', {
			data: data,
			type: typeof FormData !== 'undefined' ? this.form.enctype : 'application/x-www-form-urlencoded'
		});

		PropForms_util.dispatchEvent({
			name: 'send',
			event: event,
			element: this.form
		});

		this._request().send(data);
	}

	_createData(): FormData | string {
		let data: FormData;

		if(typeof FormData !== 'undefined') {
			data = new FormData(this.form);
			data = this._removeEmptyFileFields(data);
			data.append('submitted', 'true');

			return data;
		} else {
			return this._serialise(this.form);
		}
	}

	_removeEmptyFileFields(data: FormData): FormData {
		if (typeof FormData.prototype.forEach === "undefined") {
			return data;
		}

		FormData.prototype.forEach.call(data, function(value, key) {
			if (value instanceof File && value.name === '') {
				data.delete(key);
			}
		});

		return data;
	}

	_request(): XMLHttpRequest {

		const request: XMLHttpRequest = new XMLHttpRequest();

		request.open(this.form.method, this.form.action, true);
		if(typeof FormData === 'undefined') {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		request.onload = this._onLoad.bind(this);

		return request;
	}

	_serialise(form: HTMLFormElement): string {

		let data: Object = {};
		let serialised = '';
		let i;

		for(i = 0; i < form.elements.length; i++) {
			let field = form.elements[i];

			if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLButtonElement) {
				if(field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
					if(field.checked) {
						data[field.name] = field.value;
					}
					continue;
				}
				data[field.name] = field.value;
			}
		}

		i = 0;
		for(let key in data) {
			if(data.hasOwnProperty(key)){
				let character: string = i > 0 ? '&' : '';
				serialised += `${character}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
				i++;
			}
		}

		return `${serialised}&submitted=`;
	}

	_onLoad(e: Object): void {

		const response = e.target;
		const DOM: Document = new DOMParser().parseFromString(response.responseText, 'text/html');
		const wrapper = DOM.getElementById(`${this.form.id}-wrapper`);

		if(wrapper === null) {
			PropForms_util.log(`Cannot find wrapper #${this.form.id}-wrapper, please check your markup`, 'error');
			return
		}

		const passing = wrapper.getAttribute('data-success');

		switch(passing) {
			case 'true':
				this._onSuccess();
				break;
			case 'false':
				this._onError(DOM);
				break;
			default:
				PropForms_util.log(`#${this.form.id}-wrapper, does not have a data-success attribute or the value is invalid, please check your markup`, 'error');
				break
		}
	}

	_onError(DOM: Document): void {

		const errors: NodeList<HTMLElement> = DOM.querySelectorAll(`.${this.options.errorClass}`);
		const event: ?Event = PropForms_util.createEvent('error', {
			form: this.form,
			errors: this.validation.errors
		});

		for(let i = 0; i < errors.length; i++) {
			let field: HTMLElement = errors[i];
			this.validation.serverValidation(field);
		}

		PropForms_util.dispatchEvent({
			name: 'error',
			event: event,
			element: this.form
		});
	}

	_onSuccess(): void {

		const event: ?Event = PropForms_util.createEvent('success', {
			form: this.form,
			message: this.options.messages['success']
		});

		this.validation.passAll();

		PropForms_util.dispatchEvent({
			name: 'success',
			event: event,
			element: this.form
		});
	}

}

export default PropForms_ajax;