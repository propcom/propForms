'use strict';

class PF_public {

	constructor(core) {

		this.enable = () => {

			core.disable(false);

		};

		this.disable = () => {

			core.disable(true);

		};

	}

}

export default PF_public;