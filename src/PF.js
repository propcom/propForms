'use strict';

import PF_util from './PF_util';
import SF from './SlickForms/SF';

class PF {

	static version() {

		return `2.0.0`;

	}

	constructor(element, options = {}) {

		this.element = element;
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

		this.SlickForms = new SF(this.settings.slick);

		return this;

	}

}

export default PF;

window.PF = PF;