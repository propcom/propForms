import PropForms_public from './../PropForms/PropForms_public';
import PropForms_error from './../PropForms/PropForms_error';

declare type Settings = {
	minLengths: {[key: string]: number};
	messages: {[key: number]: string};
	validation: {[key: string]: {
		code: number,
		method: Function
	}}
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