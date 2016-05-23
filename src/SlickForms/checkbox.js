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

		element.outerHTML = '<div class="checkbox__wrap">'+element.outerHTML+'<div class="checkbox__mark"></div></div>';

	}

	static check(element) {

		let marker = element.parentNode.querySelectorAll('.checkbox__mark')[0];

		if(element.checked) {

			PF_util.addClass(marker, 'is-active');

		} else {

			PF_util.removeClass(marker, 'is-active');

		}

	}

	static bind(element) {

		element.addEventListener('change', () => {

			SF_Checkbox.check(element);

		});

	}

}

export default SF_Checkbox;