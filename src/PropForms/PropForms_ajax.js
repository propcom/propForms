// @flow

class PropForms_ajax {

	enabled: boolean;
	form: HTMLFormElement;

	constructor(details: Object = {}) {

		this.enabled = true;
		this.form = details.form;

		console.log('AJAX init');
	}

	send(): void {

		let data: FormData | string = this._createData();

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
				if(field instanceof  HTMLInputElement && field.type === 'checkbox') {
					data[field.name] = field.checked;
					break;
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

		console.log(serialised);

		return serialised;
	}

	_onLoad(e: Object): void {

		const response = e.target;

		console.log(response.responseText);

	}

}

export default PropForms_ajax;