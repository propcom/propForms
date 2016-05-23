'use strict';

import PF_util from '../PF_util';

class SF_Checkbox {

	constructor() {

		this.elements = document.getElementsByTagName('input');

		for(var i = 0; i < this.elements.length; i++) {

			if(this.elements[i].type !== 'checkbox') {

				continue;

			}

			if(!PF_util.hasClass(this.elements[i].parentNode, 'checkbox__wrap')) {

				SF_Checkbox.wrap(this.elements[i]);

			}

			SF_Checkbox.check(this.elements[i]);
			SF_Checkbox.bind(this.elements[i]);

		}

	}

	static wrap(element) {

		element.outerHTML = `<span class="checkbox__wrap">${element.outerHTML}<span class="checkbox__mark"></span></span>`;

	}

	static check(element) {

		let marker = element.parentNode.querySelectorAll('.checkbox__mark')[0];

		if(!marker) {

			PF_util.log(`Cannot find 'checkbox__mark' in your 'checkbox__wrap'`, `warn`);
			return;

		}

		if(element.checked) {

			PF_util.addClass(marker, 'checkbox__mark--active');

		} else {

			PF_util.removeClass(marker, 'checkbox__mark--active');

		}

	}

	static bind(element) {

		element.addEventListener('change', () => {

			SF_Checkbox.check(element);

		});

	}

}

export default SF_Checkbox;