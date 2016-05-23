'use strict';

import SF_Select from './select';

class SF {

	constructor(options) {

		this.settings = options;
		this.select = this.settings.select ? new SF_Select() : null;

	}

}

export default SF;