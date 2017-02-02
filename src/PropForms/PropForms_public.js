class PropForms_public {

	constructor(core) {

		this.enable = () => {

			core.disable(false);

		};

		this.disable = () => {

			core.disable(true);

		};

	}

}

export default PropForms_public;