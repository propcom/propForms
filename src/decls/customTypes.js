import PropForms_public from './../PropForms/PropForms_public';
import PropForms_error from './../PropForms/PropForms_error';
import PropForms_ajax from './../PropForms/PropForms_ajax';

declare type Settings = {
	parent: ?string;
	errorClass: string;
	minLengths: {[key: string]: number};
	messages: {[key: number | string]: string};
	validation: {[key: string]: {
		code: number,
		method: Function
	}};
	ajax: ?PropForms_ajax;
};

declare type Instances = {
	[key: string | number] : PropForms_public;
};

declare type FieldError = {
	code: number;
	field: HTMLElement;
	name: string;
	message: string;
	type: string;
}

declare type Errors = {
	[key: any]: PropForms_error
}