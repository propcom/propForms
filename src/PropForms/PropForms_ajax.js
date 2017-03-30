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
			data.append('submitted', 'true');

			return data;
		} else {
			return this._serialise(this.form);
		}
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
		const header = response.getResponseHeader('PropForm');
		const DOM: Document = new DOMParser().parseFromString(response.responseText, 'text/html');

		switch(header) {
			case 'success':
				this._onSuccess();
				break;

			case 'error':
				this._onError(DOM);
				break
		}

	}

	_onError(DOM: Document): void {

		console.log(DOM);

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
		console.log('FORM SUCCESS WOO WOO');
	}

}

export default PropForms_ajax;