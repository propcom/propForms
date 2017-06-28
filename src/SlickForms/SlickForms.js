import SlickForms_select from './SlickForms_select';
import SlickForms_checkbox from './SlickForms_checkbox';
import SlickForms_file from './SlickForms_file';

class SlickForms {

	defaults = {
		select: true,
		checkbox: true,
		file: true,
		exclude: null,
		fileText: {
			button: 'Choose file(s)',
			label: 'Please select a file(s)',
			change: 'Change file(s)'
		}
	};

	constructor(options) {

		this.options = {
			...this.defaults,
			...options,
			fileText: {
				...this.defaults.fileText,
				...options.fileText
			}
		};

		this.select = this.options.select && new SlickForms_select(this.options);
		this.checkbox = this.options.checkbox && new SlickForms_checkbox(this.options);
		this.file = this.options.file && new SlickForms_file(this.options)
	}

	reSkin() {
		this.options.select && this.select.skin();
		this.options.checkbox && this.checkbox.skin();
		this.options.file && this.file.skin();
	}
}

export default SlickForms;