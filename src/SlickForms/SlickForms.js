import SlickForms_select from './SlickForms_select';
import SlickForms_checkbox from './SlickForms_checkbox';

class SlickForms {

	constructor(options) {

		this.settings = options;

		this.select = new SlickForms_select(options);
		this.checkbox = new SlickForms_checkbox(options);

	}

	reSkin() {

		this.select.skin();
		this.checkbox.skin();

	}

}

export default SlickForms;