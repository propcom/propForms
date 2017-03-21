class PropForms_error {

	code: number;
	field: HTMLTextAreaElement | HTMLInputElement | HTMLTextAreaElement;
	name: string;
	message: string;
	type: string;

	constructor(details: FieldError = {}, passing: boolean): ?PropForms_error {

		if(passing === true) {
			return null;
		}

		this.code = details.code;
		this.field = details.element;
		this.name = details.name;
		this.message = details.message;
		this.type = details.type;

		return this;
	}
}

export default PropForms_error;