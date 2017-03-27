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

		const data = this._serialise(this.form);
		const request: XMLHttpRequest = new XMLHttpRequest();

		request.open(this.form.method, this.form.action, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.onload = this._onLoad.bind(this);

		request.send(data);
	}

	_serialise(form: HTMLFormElement): string {

		let data: Object = {};
		let serialised = '';
		let i;

		for(i = 0; i < form.elements.length; i++) {
			let field = form.elements[i];

			if(field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLButtonElement) {
				data[field.name] = field.value;
			}
		}

		i = 0;
		for(let key in data) {
			if(data.hasOwnProperty(key)){
				let character: string = i === 0 ? '?' : '&';
				serialised += `${character}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
				i++;
			}
		}

		return serialised;
	}

	_onLoad(e: Object): void {

		const response = e.target;

		console.log(response.responseText);

	}

}

export default PropForms_ajax;