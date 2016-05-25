'use strict';

import SF_Select from './SF_select';
import SF_Checkbox from './SF_checkbox';

class SF {

	constructor(options) {

		this.settings = options;

		this.select = new SF_Select(options);
		this.checkbox = new SF_Checkbox(options);

	}

	reSkin() {

		this.select.skin();
		this.checkbox.skin();

	}

}

export default SF;