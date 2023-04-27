/********w************
    
    Project 4
    Name: Hang Do
    Date: 02-19-2023
    Description: Website Development & Deployment

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;


}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	//	The validations below
	let errorFlag = false;

	//Validate all require fields
	let requiredFields = ["name","phonenumber", "email"];
	for(let i=0 ; i<requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			//Raise the error flag
			errorFlag = true;
		}
	}

    //Validate valid phone number
    let phonenumberValue = document.getElementById("phonenumber").value;

    if(phonenumberValue.length !== 10){
        document.getElementById("invalidphone_error").style.display = "block";
        
        if(!errorFlag){
            document.getElementById("phonenumber").focus();
            document.getElementById("phonenumber").select();
        }

        errorFlag = true;
    }
    

	//Validate the Email text inputs
	const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);
	let emailValue = document.getElementById("email").value;

	if(!emailRegex.test(emailValue)){
		document.getElementById("emailformat_error").style.display = "block";

		if (!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}
	return errorFlag;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}


/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}


/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {

	// Add event listener for the form submit
	document.getElementById("form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	//document.getElementById("orderform").reset();

	// Add event listener for the form reset function
	document.getElementById("form").addEventListener("reset", resetForm);

	hideErrors();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);