$('button.destroy').click(function (e) {
	e.preventDefault();
	// lấy giá trị của thuộc tính data-href mà button được click
	var dataUrl = $(this).attr('data-href');
	$('#exampleModal a').attr('href', dataUrl);
});

const goToPage = (page) => {
	const currentURL = window.location.href;
	const obj = new URL(currentURL);
	obj.searchParams.set('page', page);
	window.location.href = obj.href;
}

$(".form-student-create").validate({
	rules: {
		// simple rule, converted to {required:true}
		name: {
			required: true
		},
		// compound rule
		birthday: {
			required: true,
		},
		gender: {
			required: true
		}
	},
	messages: {
		// simple rule, converted to {required:true}
		name: {
			required: 'Vui lòng nhập họ và tên'
		},
		// compound rule
		birthday: {
			required: 'Vui lòng chọn ngày sinh',
		},
		gender: {
			required: 'Vui lòng chọn giới tính',
		}
	}
});