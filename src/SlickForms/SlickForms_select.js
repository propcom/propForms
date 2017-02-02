import PropForms_util from '../PropForms/PropForms_util';

class SlickForms_select {

	constructor(options) {

		this.bound = [];
		this.options = options;
		this.elements = document.getElementsByTagName('select');

		this.skin();

	}

	skin() {

		for(let i = 0; i < this.elements.length; i++) {

			if(PropForms_util.searchArray(this.options.exclude, this.elements[i]) === true) {

				continue;

			}

			if(!PropForms_util.hasClass(this.elements[i].parentNode, 'select__wrap')) {

				SlickForms_select.wrap(this.elements[i]);

			}

			SlickForms_select.check(this.elements[i]);

			this.bind(this.elements[i]);

		}

	}

	static setLabel(element, value) {

		if(element.parentNode.querySelectorAll('.select__label')[0]) {

			element.parentNode.querySelectorAll('.select__label')[0].innerHTML = value;

		} else {

			PropForms_util.log(`Cannot find 'select__label' in your 'select__wrap'`, `warn`);

		}

	}

	static wrap(element) {

		element.outerHTML = '<span class="select__wrap">' + element.outerHTML + '<span class="select__label">' + element.value + '</span></span>';

	}

	static check(element) {

		let elementValue = element.value,
			selectedOption = element.getElementsByTagName('option'),
			optionText;

		for(let i = 0; i < selectedOption.length; i++) {

			if(selectedOption[i].value !== elementValue) {

				continue;

			}

			optionText = selectedOption[i].textContent || selectedOption[i].innerText;

		}

		SlickForms_select.setLabel(element, optionText);

	}

	bind(element) {

		if(PropForms_util.searchArray(this.bound, element) === true) {

			return;

		}

		this.bound.push(element);

		element.addEventListener('change', () => {

			SlickForms_select.check(element);

		});

	}

}

export default SlickForms_select;