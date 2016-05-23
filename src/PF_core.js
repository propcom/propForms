'use strict';

import SF from './SlickForms/SF';
import PF_public from './PF_public';

class PF_core {

	constructor(elements, options) {

		this.elements = elements;
		this.options = options;

		this.SlickForms = new SF(this.options.slick);

		return new PF_public(this);

	}

}

export default PF_core;