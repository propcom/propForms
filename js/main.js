;(function(window) {

	var forms = new PropForms(form, {
		minLengths: {
			text: 2
		},
		messages: {
			5: 'Custom validation test'
		},
		ajax: null
	});

	form.addEventListener("fieldvalid", function(e) {
		console.log(e);
	});


})(window);