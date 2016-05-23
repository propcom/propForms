'use strict';

import PF_util from '../PF_util';

class SF_Checkbox {

	constructor() {

		this.bound = [];
		this.elements = document.getElementsByTagName('input');

		this.skin();

	}

	skin() {

		for(var i = 0; i < this.elements.length; i++) {

			if(this.elements[i].type !== 'checkbox' && this.elements[i].type !== 'radio') {

				continue;

			}

			if(!PF_util.hasClass(this.elements[i].parentNode, `${this.elements[i].type}__wrap`)) {

				SF_Checkbox.wrap(this.elements[i]);

			}

			SF_Checkbox.check(this.elements[i]);

			this.bind(this.elements[i]);

		}

	}

	static wrap(element) {

		element.outerHTML = `<span class="${element.type}__wrap">${element.outerHTML}<span class="${element.type}__mark"></span></span>`;

	}

	static check(element) {

		let marker = element.parentNode.querySelectorAll(`.${element.type}__mark`)[0];

		if(!marker) {

			PF_util.log(`Cannot find '${element.type}__mark' in your '${element.type}__wrap'`, `warn`);
			return;

		}

		if(element.checked) {

			PF_util.addClass(marker, `${element.type}__mark--active`);

		} else {

			PF_util.removeClass(marker, `${element.type}__mark--active`);

		}

	}

	bind(element) {

		if(PF_util.searchArray(this.bound, element)) {

			return;

		}

		this.bound.push(element);

		element.addEventListener('change', () => {

			let group = document.getElementsByName(element.getAttribute('name'));

			for(let i = 0, l = group.length; i < l; i++) {

				SF_Checkbox.check(group[i]);

			}

		});

	}

}

export default SF_Checkbox;