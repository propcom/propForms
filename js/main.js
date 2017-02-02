;(function(window) {

	var forms = document.querySelectorAll('.js-propform');
	var style = new SlickForms({

		exclude: document.querySelectorAll('.no-wrap')

	});

	window.forms = new PropForms(forms, {});

})(window);