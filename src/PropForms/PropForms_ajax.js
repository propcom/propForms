class PropForms_ajax {

	enabled: boolean;

	constructor() {

		this.enabled = true;

		console.log('AJAX init');
	}

	send() {
		console.log(this.enabled + ' sending');
	}

}

export default PropForms_ajax;