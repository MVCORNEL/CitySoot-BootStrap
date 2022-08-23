class AuthView {
  #stateText = document.querySelector('.state-text');

  #login = document.getElementById('btn-nav-login');
  #logout = document.getElementById('btn-nav-logout');

  setStateText(isLogged, message = 'Not Logged') {
    this.#stateText.textContent = message;
  }

  addLogoutEventListener(event) {
    this.#logout.addEventListener('click', function () {
      event();
    });
  }

  toggleLoginLogout(isLogged) {
    if (isLogged) {
      this.#logout.classList.add('visible');
    } else {
      this.#login.classList.add('visible');
    }
  }
}

export default new AuthView();
