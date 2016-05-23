'use strict';

import PF_util from './PF_util';
import PF_core from './PF_core';

class PF {

	static version() {

		return `2.0.0`;

	}

	constructor(elements, options = {}) {

		this.elements = elements;
		this.defaults = {

			slick: {

				select: true,
				radio: true,
				checkbox: true,
				file: true

			}

		};

		this.settings = PF_util.setOptions({

			defaults: this.defaults,
			updates: options

		});

		return new PF_core(this.elements, this.settings);

	}

}

export default PF;

window.PF = PF;