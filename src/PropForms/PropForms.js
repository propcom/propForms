//@flow

import { Settings } from './PropForms_types';
import PropForms_util from './PropForms_util';
import PropForms_core from './PropForms_core';
import PropForms_public from './PropForms_public';

type Instances = {[key: string | number] : PropForms_public};

class PropForms {

	static version(): string {

		return `2.0.0`;

	}

	elements: HTMLFormElement | NodeList<HTMLFormElement>;
	instances: Instances;
	defaults: Settings;
	settings: Settings;

	constructor(elements: HTMLFormElement | NodeList<HTMLFormElement>, options: Settings = {}): Instances {

		this.elements = elements;
		this.instances = {};
		this.defaults = {};

		this.settings = PropForms_util.setOptions({

			defaults: this.defaults,
			updates: options

		});

		this.setInstances();

		return this.instances;

	}

	setInstances(): void {

		if(this.elements instanceof NodeList) {

			for(let i = 0, l = this.elements.length; i < l; i++) {

				let id: string | number = this.elements[i].getAttribute('id') || i;

				//$FlowFixMe: Irrelevant Error as instanceof catches.
				this.instances[id] = new PropForms_core(this.elements[i], this.settings);

			}

		} else {

			this.instances[this.elements.getAttribute('id') || 0] = new PropForms_core(this.elements, this.settings);

		}

	}

}

export default PropForms;