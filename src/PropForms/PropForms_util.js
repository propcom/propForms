//@flow

import PropForms from './PropForms';

class PropForms_util {

	static log(message, type = `log`): void {
		console[type](`[PropForms - ${PropForms.version()}]: ${message}`);
	}

	static addClass(elements: Element | NodeList<HTMLElement>, className: string): void {

		if(typeof elements === 'undefined') {
			return;
		}

		let add = function(element: Element, className: string) {
			if(element.classList) {
				element.classList.add(className);
			} else {
				element.className += ` ${className}`;
			}
		};

		if(elements instanceof Element) {
			add(elements, className);
		} else {
			for(let i = 0, l = elements.length; i < l; i++) {
				add(elements[i], className);
			}
		}
	}

	static removeClass(elements: Element | NodeList<HTMLElement>, className: string) {

		if(typeof elements === 'undefined') {
			return;
		}

		let remove = function(element: Element, className: string) {
			if(element.classList) {
				element.classList.remove(className);
			} else {
				element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, `gi`), ' ').trim();
			}
		};

		if(elements instanceof Element) {
			remove(elements, className);
		} else {
			for(let i = 0, l = elements.length; i < l; i++) {
				remove(elements[i], className);
			}
		}
	}

	static findParent(element: Element, className: string): ?Element {

		let parent: ?Element = element;
		let node: ?Element;

		while(parent) {
			if(PropForms_util.hasClass(parent, className)) {
				node = parent;
				break;
			}
			parent = parent.parentElement;
		}

		return node;
	}

	static hasClass(element: Element, className: string): boolean {

		if(element.classList) {
			return element.classList.contains(className);
		} else {
			return (new RegExp(`(^| )${className}( |$)`, `gi`).test(element.className));
		}
	}

	static searchArray(array: ?Array<*>, item: any): boolean {

		if(!array) {
			return false
		}

		for(let i = 0, l = array.length; i < l; i++) {
			if(array[i] === item) {
				return true;
			}
		}

		return false;
	}

	static createEvent(name: string, detail: { [key: string]: any } = {}): ?Event {

		let event: ?Event = null;

		if(document.createEvent) {
			event = document.createEvent('CustomEvent');
			event.initCustomEvent(name, false, false, detail);
		}

		return event;
	}

	static dispatchEvent(data: { [key: string]: any }): void {

		if(data.element.dispatchEvent) {
			data.element.dispatchEvent(data.event);
		} else if(data.element.fireEvent) {
			data.element.fireEvent(data.name, data.event);
		}
	}
}

export default PropForms_util;