import PropForms_public from './../PropForms/PropForms_public';

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
	element: HTMLElement;
	name: string;
	message: string;
	type: string;
}

declare type Errors = {
	[key: any]: FieldError
}