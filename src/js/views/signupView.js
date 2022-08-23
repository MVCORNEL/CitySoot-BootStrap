class SignupView {
  #formSignup = document.querySelector('#signupForm');
  #form = document.querySelector('#loginForm');
  #fname = document.querySelector('#signupFirstName');
  #lname = document.querySelector('#signupLastName');
  #email = document.querySelector('#signupEmail');
  #password = document.querySelector('#signupPassword');
  #confirmPassword = document.querySelector('#signupConfirmPassword');

  get fname() {
    return this.#fname.value;
  }

  get lname() {
    return this.#lname.value;
  }

  get email() {
    return this.#email.value;
  }

  get password() {
    return this.#password.value;
  }

  get confirmPassword() {
    return this.#confirmPassword.value;
  }

  //function to show first name error if there is one
  setFirstNameError(isValid) {
    this.#setError(this.#fname, isValid);
  }

  //function to show last name error if there is one
  setLastNameError(isValid) {
    this.#setError(this.#lname, isValid);
  }

  //function to show email error if there is one
  setEmailError(isValid) {
    this.#setError(this.#email, isValid);
  }

  //function to show password error if there is one
  setPasswordError(isValid) {
    this.#setError(this.#password, isValid);
  }

  //function to show confirm password error if there is one
  setConfirmPasswordError(isValid) {
    this.#setError(this.#confirmPassword, isValid);
  }

  //function used to the form errors based on the current field
  #setError(field, isValid) {
    const error = field.parentElement.lastElementChild;
    error.textContent = '';
    if (isValid === true) {
      field.classList.remove('is-invalid');
    } else {
      field.classList.add('is-invalid');
      error.textContent = isValid;
    }
  }

  //function used to listen on submit form event encounter
  //[param] - handler function that will be executed when the form is submitted
  addSigninListener(handler) {
    this.#formSignup.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Signup');
      handler();
    });
  }
}

export default new SignupView();
