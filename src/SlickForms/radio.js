'use strict';

import PF_util from '../PF_util';

class SF_Radio {

	constructor() {

		this.elements = document.getElementsByTagName('input');

		for(var i = 0; i < this.elements.length; i++) {

			if(this.elements[i].type !== 'radio') {

				continue;

			}

			if(!PF_util.hasClass(this.elements[i].parentNode, 'radio__wrap')) {

				SF_Radio.wrap(this.elements[i]);

			}

			SF_Radio.check(this.elements[i]);
			SF_Radio.bind(this.elements[i]);

		}

	}

	static wrap(element) {

		element.outerHTML = `<span class="radio__wrap">${element.outerHTML}<span class="radio__mark"></span></span>`;

	}

	static check(element) {

		let marker = element.parentNode.querySelectorAll('.radio__mark')[0];

		if(!marker) {

			PF_util.log(`Cannot find 'radio__mark' in your 'radio__wrap'`, `warn`);
			return;

		}

		if(element.checked) {

			PF_util.addClass(marker, 'radio__mark--active');

		} else {

			PF_util.removeClass(marker, 'radio__mark--active');

		}

	}

	static bind(element) {

		element.addEventListener('change', () => {

			let group = document.getElementsByName(element.getAttribute('name'));

			for(let i = 0, l = group.length; i < l; i++) {

				SF_Radio.check(group[i]);

			}

		});

	}

}

export default SF_Radio;