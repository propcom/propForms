'use strict';

import SF from './../SlickForms/SF';
import PF_util from './PF_util';
import PF_core from './PF_core';

class PF {

	static version() {

		return `2.0.0`;

	}

	constructor(elements, options = {}) {

		this.elements = elements;
		this.instances = {};
		this.defaults = {

		};

		this.settings = PF_util.setOptions({

			defaults: this.defaults,
			updates: options

		});

		this.setInstances();

		return this.instances;

	}

	setInstances() {

		for(var i = 0, l = this.elements.length; i < l; i++) {

			let id = this.elements[i].getAttribute('id') || i;

			this.instances[id] = new PF_core(this.elements[i], this.settings);

		}

	}

}

export default PF;

window.PF = PF;
window.SF = SF;