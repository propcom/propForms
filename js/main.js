;(function(window) {

	var forms = document.querySelectorAll('.js-propform'),
		propForms = new PF(forms, {}),
		slickForms = new SF({

		exclude: document.querySelectorAll('.no-wrap')

	});

	console.log(propForms, slickForms);

})(window);