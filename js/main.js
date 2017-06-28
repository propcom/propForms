;(function(window) {

	var forms = document.querySelectorAll('.js-propform');
	var style = new SlickForms({
		//exclude: document.querySelectorAll('.no-wrap')
	});

	for(var i = 0; i < forms.length; i++) {
		forms[i].addEventListener('error', function(e) {
			//console.log(e.detail);
		});

		forms[i].addEventListener('fieldError', function(e) {
			console.log(e.detail);
		});
	}

	window.forms = new PropForms(forms, {
		minLengths: {
			text: 2
		},
		messages: {
			5: 'Custom validation test'
		},
		ajax: null
	});

	console.log(window.forms);

})(window);