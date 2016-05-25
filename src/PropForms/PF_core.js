'use strict';

import PF_public from './PF_public';

class PF_core {

	constructor(elements, options) {

		this.elements = elements;
		this.options = options;

		return new PF_public(this);

	}

}

export default PF_core;