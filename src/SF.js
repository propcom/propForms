'use strict';

import SF_Select from './SlickForms/select';

class SF {

	constructor(options) {

		this.settings = options;

		this.select = new SF_Select();

	}

}

export default SF;