$('button.destroy').click(function (e) {
	e.preventDefault();
	// lấy giá trị của thuộc tính data-href mà button được click
	var dataUrl = $(this).attr('data-href');
	$('#exampleModal a').attr('href', dataUrl);
});

const goToPage =  (page) => {
	const currentURL = window.location.href;
	const obj = new URL(currentURL);
	obj.searchParams.set('page', page);
	window.location.href = obj.href;
}
