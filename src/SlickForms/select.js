'use strict';

import PF_util from '../PF_util';

class SF_Select {

	constructor() {

		this.bound = [];
		this.elements = document.getElementsByTagName('select');

		this.skin();

	}

	skin() {

		for(var i = 0; i < this.elements.length; i++) {

			if(this.elements[i].getAttribute('ng-model')) {

				continue;

			}

			if(!PF_util.hasClass(this.elements[i].parentNode, 'select__wrap')) {

				SF_Select.wrap(this.elements[i]);

			}

			SF_Select.check(this.elements[i]);

			this.bind(this.elements[i]);

		}

	}

	static wrap(element) {

		element.outerHTML = '<div class="select__wrap">' + element.outerHTML + '<div class="select__label">' + element.value + '</div></div>';

	}

	bind(element) {

		if(PF_util.searchArray(this.bound, element)) {

			return;

		}

		this.bound.push(element);

		element.addEventListener('change', () => {

			SF_Select.check(element);

		});

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

	static setLabel(element, value) {

		if(element.parentNode.querySelectorAll('.select__label')[0]) {

			element.parentNode.querySelectorAll('.select__label')[0].innerHTML = value;

		} else {

			PF_util.log(`Cannot find 'select__label' in your 'select__wrap'`, `warn`);

		}

	}

}

export default SF_Select;