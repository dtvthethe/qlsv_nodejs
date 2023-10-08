$('button.btn-destroy').click(function (e) { 
	e.preventDefault();
	var dataUrl = $(this).attr('data-href');
	$('#exampleModal a').attr('href', dataUrl);
});
