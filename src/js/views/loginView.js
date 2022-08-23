class LoginView {
  #form = document.querySelector('#loginForm');
  #email = document.querySelector('#loginEmail');
  #password = document.querySelector('#loginPassword');

  get password() {
    return this.#password.value;
  }

  get email() {
    return this.#email.value;
  }

  setEmailError(isValid) {
    this.#setError(this.#email, isValid);
  }

  setPasswordError(isValid) {
    this.#setError(this.#password, isValid);
  }

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

  addLoginListener(handler) {
    this.#form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        handler();
        //UPDATES DATA
      }.bind(this)
    );
  }
}

export default new LoginView();
