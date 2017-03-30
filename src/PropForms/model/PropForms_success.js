class PropForms_success {

	field: ?HTMLTextAreaElement | ?HTMLInputElement | ?HTMLTextAreaElement;
	fields: ?NodeList<HTMLElement>;
	parent: ?Element;
	name: string;

	constructor(details = {}): PropForms_success {

		this.field = details.field;
		this.fields = details.fields;
		this.parent = details.parent;
		this.name = details.name;

		return this;
	}
}

export default PropForms_success;