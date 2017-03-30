class PropForms_error {

	code: number;
	field: ?HTMLTextAreaElement | ?HTMLInputElement | ?HTMLTextAreaElement;
	fields: ?NodeList<HTMLElement>;
	name: string;
	message: string;
	type: string;
	passing: boolean;

	constructor(details: FieldError = {}, passing: boolean): ?PropForms_error {

		this.passing = passing;

		if(this.passing === true) {
			return this;
		}

		this.code = details.code;
		this.field = details.field;
		this.fields = details.fields;
		this.name = details.name;
		this.message = details.message;
		this.type = details.type;

		return this;
	}
}

export default PropForms_error;