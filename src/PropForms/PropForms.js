//@flow

import PropForms_util from './PropForms_util';
import PropForms_core from './PropForms_core';

class PropForms {

	static version() {

		return `2.0.0`;

	}

	constructor(elements, options = {}) {

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

		for(let i = 0, l = this.elements.length; i < l; i++) {

			let id = this.elements[i].getAttribute('id') || i;

			this.instances[id] = new PropForms_core(this.elements[i], this.settings);

		}

	}

}

export default PropForms;