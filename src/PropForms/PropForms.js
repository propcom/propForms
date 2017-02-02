//@flow

import PropForms_util from './PropForms_util';
import PropForms_core from './PropForms_core';

type Settings = {

};

class PropForms {

	static version() {

		return `2.0.0`;

	}

	elements: HTMLElement | NodeList<*>;
	defaults: Settings;
	settings: Settings;
	instances: {[key: string | number] : Class<PropForms_core>};

	constructor(elements: HTMLElement | NodeList<*>, options: Settings = {}) {

		this.elements = elements;
		this.instances = {};
		this.defaults = {

		};

		this.settings = PropForms_util.setOptions({

			defaults: this.defaults,
			updates: options

		});

		this.setInstances();

		return this.instances;

	}

	setInstances() {

		if(this.elements instanceof NodeList) {

			for(let i = 0, l = this.elements.length; i < l; i++) {

				let id: string | number = this.elements[i].getAttribute('id') || i;

				this.instances[id] = new PropForms_core(this.elements[i], this.settings);

			}

		} else {

			this.instances[this.elements.getAttribute('id') || 0] = new PropForms_core(this.elements, this.settings);

		}

	}

}

export default PropForms;