;(function(window) {

	var forms = document.querySelectorAll('.js-propform');
	var slickForms = new SF({

		exclude: document.querySelectorAll('.no-wrap')

	});

	window.propForms = new PF(forms, {});

})(window);