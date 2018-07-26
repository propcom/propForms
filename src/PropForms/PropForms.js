//@flow

import PropForms_core from './PropForms_core';
import PropForms_ajax from './PropForms_ajax';

class PropForms {

	static version(): string {
		return `2.2.1`;
	}

	element: HTMLFormElement;
	core: PropForms_core;
	defaults: Settings;
	settings: Settings;

	constructor(element: HTMLFormElement, options: ?Settings = null) {

		this.element = element;
		this.defaults = {
			parent: undefined,
			errorClass: 'propForms--error',
			minLengths: {
				text: 2,
				email: 6,
				tel: 6,
				password: 6
			},
			messages: {
				'0': `Please fill out this field correctly`,
				'1': `Please enter at least {n} characters`,
				'2': `Please enter a valid email address`,
				'3': `Please check this box to continue`,
				'4': `Please select at least one option`,
				'5': `Please select an option`,
				'6': `Server validation error`,
				success: 'Thank you, we will be in touch soon.'
			},
			validation: {},
			ajax: PropForms_ajax
		};

		if(options) {
			this.settings = {
				...this.defaults,
				...options,
				minLengths: {
					...this.defaults.minLengths,
					...options.minLengths
				},
				messages: {
					...this.defaults.messages,
					...options.messages
				}
			}
		} else {
			this.settings = this.defaults;
		}

		this.core = new PropForms_core(this.element, this.settings);
	}

	enable(): void {
		this.core.disable(false)
	}

	disable(): void {
		this.core.disable(true)
	}

	getErrors(): Errors {
		return this.core.validation.errors;
	}

	submit(): void {
		this.core.submit()
	}

	validate(): void {
		this.core.validation.validate()
	}

	setAjax(enabled: boolean = true): void {
		if(!this.core.ajax) {
			return;
		}
		this.core.ajax.enabled = enabled;
	}
}

export default PropForms;