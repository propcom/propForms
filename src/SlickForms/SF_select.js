'use strict';

import PF_util from '../PropForms/PF_util';

class SF_Select {

	constructor(options) {

		this.bound = [];
		this.options = options;
		this.elements = document.getElementsByTagName('select');

		this.skin();

	}

	skin() {

		for(var i = 0; i < this.elements.length; i++) {

			if(PF_util.searchArray(this.options.exclude, this.elements[i]) === true) {

				continue;

			}

			if(!PF_util.hasClass(this.elements[i].parentNode, 'select__wrap')) {

				SF_Select.wrap(this.elements[i]);

			}

			SF_Select.check(this.elements[i]);

			this.bind(this.elements[i]);

		}

	}

	static setLabel(element, value) {

		if(element.parentNode.querySelectorAll('.select__label')[0]) {

			element.parentNode.querySelectorAll('.select__label')[0].innerHTML = value;

		} else {

			PF_util.log(`Cannot find 'select__label' in your 'select__wrap'`, `warn`);

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

		SF_Select.setLabel(element, optionText);

	}

	bind(element) {

		if(PF_util.searchArray(this.bound, element) === true) {

			return;

		}

		this.bound.push(element);

		element.addEventListener('change', () => {

			SF_Select.check(element);

		});

	}

}

export default SF_Select;