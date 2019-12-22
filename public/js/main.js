function validatePassword() {
	const password = $('#password').val();
	const rePassword = $('#rePassword').val();
	const form = $('#formReset');
	if (password === rePassword && password != '') {
		form.submit()
		return;
	}
	alert('Password Not Match')
}

function validateRegister() {
	const name = $('#name').val();
	const idType = $('#idType').val();
	const idNumber = $('#idNumber').val();
	const birthdate = $('#birthdate').val();
	const mobileNo = $('#mobileNo').val();
	const username = $('#username').val();
	const email = $('#email').val();
	const password = $('#password').val();
	const rePassword = $('#rePassword').val();
	const form = $('#formRegister');
	if (password === rePassword && password != '' && name != '' && idType != ''
		&& idNumber != '' && birthdate != '' && mobileNo != '' && username != ''
		&& email != '') {
		form.submit()
		return;
	}
	alert('Please fill all field!\nMake sure your password Match!')
}

function validateAddQualification() {
	const qualificationName = $('#qualificationName').val();
	const subjectName = $('#subjectName').val();
	const grade = $('#grade').val();
	const score = $('#score').val();
	const form = $('#formAddQualification');
	if (qualificationName != '' && subjectName != '' && grade != '' && score != '') {
		form.submit()
		return;
	}
	alert('Please fill all field!')
}

function useQualification() {
	const conf = confirm("Apply to Program?");
	const form = $('#formUseQualification')
	if (conf == true) {
		form.submit()
	}
}

function validateAddProgram() {
	const programName = $('#programName').val();
	const description = $('#description').val();
	const closingDate = $('#closingDate').val();
	const form = $('#formAddProgram');
	if (programName != '' && description != '' && closingDate != '') {
		form.submit()
		return;
	}
	alert('Please fill all field!')
}

function validateDeleteProgram(i) {
	const conf = confirm("Delete this Program?");
	const form = $('#formDeleteProgram' + i)
	if (conf == true) {
		form.submit()
	}
}

function validateResultApplicant() {
	const result = $("input[name='applicationStatus']:checked").val();
	const form = $('#formResultApplicant')
	console.log('result',result)
	if (typeof(result) === 'undefined') {
		return;
	}

	const conf = confirm("Save Change?");
	if (conf == true) {
		form.submit()
	}
}

function validateAddAdminQ() {
	const qualificationName = $('#qualificationName').val();
	const minimumScore = $('#minimumScore').val();
	const gradeList = $('#gradeList').val();
	const maximumScore = $('#maximumScore').val();
	const resultCalcDesc = $('#resultCalcDesc').val();
	const form = $('#formAddAdminQ');
	if (qualificationName != '' && minimumScore != '' && maximumScore != ''
		&& gradeList != '' && resultCalcDesc != '') {
		form.submit()
		return;
	}
	alert('Please fill all field!')
}

function validateDeleteMaintain(i) {
	const conf = confirm("Delete this Qualification?");
	const form = $('#formDeleteMaintain' + i)
	if (conf == true) {
		form.submit()
	}
}

function validateAddUniv() {
	const univName = $('#univName').val();
	const form = $('#formAddUniv');
	if (univName != '') {
		form.submit()
		return;
	}
	alert('Please fill University Name!')
}

function enter_univName(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
        validateAddUniv()
    }
}

function validateDeleteUniv(i) {
	const conf = confirm("Delete this University?");
	const form = $('#formDeleteUniv' + i)
	if (conf == true) {
		form.submit()
	}
}

function validateAddAdminUniv() {
	const username = $('#username').val();
	const password = $('#password').val();
	const rePassword = $('#rePassword').val();
	const name = $('#name').val();
	const email = $('#email').val();
	const form = $('#formAddAdminUniv');
	if (username != '' && password != '' && name != ''
		&& email != '' && password === rePassword) {
		form.submit()
		return;
	}
	alert('Please fill all field!\nMake sure your password Match!')
}

function validateEditAdminUniv() {
	const username = $('#username').val();
	const name = $('#name').val();
	const email = $('#email').val();
	const form = $('#formEditAdminUniv');
	if (username != '' && name != ''
		&& email != '') {
		form.submit()
		return;
	}
	alert('Please fill all field!')
}

function validateDeleteAdminUniv(i) {
	const conf = confirm("Delete this Admin University?");
	const form = $('#formDeleteAdminUniv' + i)
	if (conf == true) {
		form.submit()
	}
}

$(document).ready(function() {
    // Datepicker
	$('input#closingDate').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
		autoclose: true,
		startDate: "+1d",
		endDate: "+5y"
	});
	$('input#birthdate').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
		autoclose: true,
		startDate: "-20y",
		endDate: "-5y"
	});
	//===========
})