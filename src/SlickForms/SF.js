'use strict';

import SF_Select from './select';
import SF_Checkbox from './checkbox';
import SF_Radio from './radio';

class SF {

	constructor(options) {

		this.settings = options;

		this.select = this.settings.select ? new SF_Select() : null;
		this.checkbox = this.settings.checkbox ? new SF_Checkbox() : null;

	}

	reSkin() {

		this.select.skin();
		this.checkbox.skin();

	}

}

export default SF;