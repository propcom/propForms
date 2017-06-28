import PropForms_util from '../PropForms/PropForms_util';

class SlickForms_checkbox {

	constructor(options) {

		this.bound = [];
		this.options = options;
		this.elements = document.getElementsByTagName('input');
		this.skin();
	}

	static wrap(element) {
		element.outerHTML = `<span class="${element.type}__wrap">${element.outerHTML}<span class="${element.type}__mark"></span></span>`;
	}

	static check(element) {

		let marker = element.parentNode.querySelectorAll(`.${element.type}__mark`)[0];

		if(!marker) {
			PropForms_util.log(`Cannot find '${element.type}__mark' in your '${element.type}__wrap'`, `warn`);
			return;
		}

		if(element.checked) {
			PropForms_util.addClass(marker, `${element.type}__mark--active`);
		} else {
			PropForms_util.removeClass(marker, `${element.type}__mark--active`);
		}
	}

	skin() {

		for(let i = 0; i < this.elements.length; i++) {

			if(PropForms_util.searchArray(this.options.exclude, this.elements[i]) === true) {
				continue;
			}

			if(this.elements[i].type !== 'checkbox' && this.elements[i].type !== 'radio') {
				continue;
			}

			if(!PropForms_util.hasClass(this.elements[i].parentNode, `${this.elements[i].type}__wrap`)) {
				SlickForms_checkbox.wrap(this.elements[i]);
			}

			SlickForms_checkbox.check(this.elements[i]);
			this.bind(this.elements[i]);
		}
	}

	bind(element) {

		if(PropForms_util.searchArray(this.bound, element) === true) {
			return;
		}
		this.bound.push(element);

		element.addEventListener('change', () => {

			let group = document.getElementsByName(element.getAttribute('name'));

			for(let i = 0, l = group.length; i < l; i++) {
				SlickForms_checkbox.check(group[i]);
			}
		});
	}
}

export default SlickForms_checkbox;