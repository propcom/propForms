//@flow

import PropForms_core from './PropForms_core';
import PropForms_ajax from './PropForms_ajax';

class PropForms {

	static version(): string {
		return `2.1.1`;
	}

	elements: HTMLFormElement | NodeList<HTMLFormElement>;
	instances: Instances;
	defaults: Settings;
	settings: Settings;

	constructor(elements: HTMLFormElement | NodeList<HTMLFormElement>, options: ?Settings = null): Instances {

		this.elements = elements;
		this.instances = {};
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

		this.setInstances();

		return this.instances;
	}

	setInstances(): void {

		if(this.elements instanceof NodeList) {
			for(let i: number = 0, l: number = this.elements.length; i < l; i++) {
				let id: string | number = this.elements[i].getAttribute('id') || i;
				// $FlowFixMe: Suppressing because it's being stupid.
				this.instances[id] = new PropForms_core(this.elements[i], this.settings);
			}
		} else {
			this.instances[this.elements.getAttribute('id') || 0] = new PropForms_core(this.elements, this.settings);
		}
	}
}

export default PropForms;