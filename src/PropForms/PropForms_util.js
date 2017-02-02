//@flow

import PropForms from './PropForms';

class PropForms_util {

	static log(message, type = `log`): void {

		console[type](`[PropForms - ${PropForms.version()}]: ${message}`);

	}

	static setOptions(objects: {defaults: Settings, updates: Settings}): Settings {

		let settings: Settings = objects.defaults;

		if(!objects.updates) {

			return objects.defaults;

		}

		for(let key in objects.defaults) {

			if(objects.defaults.hasOwnProperty(key)) {

				if(objects.updates[key] === undefined) {

					settings[key] = objects.defaults[key];
					continue;

				}

				settings[key] = objects.updates[key];

			}

		}

		return settings;

	}

	static addClass(element: HTMLElement, className: string): void {

		if(element.classList) {

			element.classList.add(className);

		} else {

			element.className += ` ${className}`;

		}

	}

	static removeClass(element: HTMLElement, className: string) {

		if(element.classList) {

			element.classList.remove(className);

		} else {

			element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, `gi`), ' ').trim();

		}

	}

	static hasClass(element: HTMLElement, className: string): boolean {

		if(element.classList) {

			return element.classList.contains(className);

		} else {

			return (new RegExp(`(^| )${className}( |$)`, `gi`).test(element.className));

		}

	}

	static searchArray(array: Array<*>, item: any): boolean {

		for(let i = 0, l = array.length; i < l; i++) {

			if(array[i] === item) {

				return true;

			}

		}

		return false;

	}

}

export default PropForms_util;