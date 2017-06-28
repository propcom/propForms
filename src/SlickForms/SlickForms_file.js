import PropForms_util from '../PropForms/PropForms_util';

class SlickForms_file {

	constructor(options) {

		this.bound = [];
		this.options = options;
		this.elements = document.getElementsByTagName('input');
		this.skin();
	}

	check(element) {

		let label = element.parentNode.querySelectorAll('.file__label')[0],
			button = element.parentNode.querySelectorAll('.file__button')[0];

		if(typeof label === `undefined`) {
			PropForms_util.log(`No label found in your file__wrap`, 'warn');
			return
		}

		if(typeof button === `undefined`) {
			PropForms_util.log(`No button found in your file__wrap`, 'warn');
			return
		}

		if(!element.value) {
			label.innerHTML = this.options.fileText.label;
			button.innerHTML = this.options.fileText.button;
		} else {
			label.innerHTML = '';
			button.innerHTML = this.options.fileText.change;

			for(let i = 0; i < element.files.length; i++) {
				let fileLabel = document.createElement('span');

				fileLabel.innerHTML = element.files[i].name + (i !== element.files.length -1 ? ', ' : '');
				label.appendChild(fileLabel);
			}
		}
	}

	wrap(element) {
		element.outerHTML = `<div class="file__wrap">${element.outerHTML}<div class="file__button">${this.options.fileText.button}</div><div class="file__label"></div></div>`
	}

	skin() {

		for(let i = 0; i < this.elements.length; i++) {

			if(PropForms_util.searchArray(this.options.exclude, this.elements[i]) === true) {
				continue;
			}
			if(this.elements[i].type !== 'file') {
				continue;
			}

			if(!PropForms_util.hasClass(this.elements[i].parentNode, 'file__wrap')) {
				this.wrap(this.elements[i]);
			}

			this.check(this.elements[i]);
			this.bind(this.elements[i]);
		}
	}

	bind(element) {

		if(PropForms_util.searchArray(this.bound, element) === true) {
			return;
		}
		this.bound.push(element);

		element.addEventListener('change', () => {
			this.check(element);
		});
	}
}

export default SlickForms_file