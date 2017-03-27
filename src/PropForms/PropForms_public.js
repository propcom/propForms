//@flow

import PropForms_core from './PropForms_core';

class PropForms_public {

	enable: Function;
	disable: Function;
	getErrors: Function;
	setAjax: Function;
	submit: Function;

	constructor(core: PropForms_core): PropForms_public {

		this.enable = (): void => {
			core.disable(false);
		};

		this.disable = (): void => {
			core.disable(true);
		};

		this.getErrors = (): Errors => {
			return core.validation.errors;
		};

		this.submit = (): void => {
			core.submit(null);
		};

		this.setAjax = (enabled: boolean = true): void => {
			core.ajax.enabled = enabled;
		};

		return this;
	}
}

export default PropForms_public;