import { sanitizeData, isEmpty, isEmailValid, isPasswordValid } from '../helpers.js';
import { login } from './../firebase.js';

export default class Login {
  static FIELDS = { EMAIL: 'email', PASSWORD: 'password' };
  #email;
  #password;
  #validatedFields;

  constructor(email, password) {
    this.#email = sanitizeData(email);
    this.#password = sanitizeData(password);
    this.#validatedFields = new Map();
  }

  #validateEmail() {
    //EMPTY
    if (isEmpty(this.#email)) {
      this.#validatedFields.set(Login.FIELDS.EMAIL, 'Email cannot be empty.');
    }
    //NOT EMPTY
    else {
      //BUT INVALID
      if (!isEmailValid(this.#email)) {
        console.log('NOT EMPTY EMAIL BUT INVALID');
        this.#validatedFields.set(Login.FIELDS.EMAIL, 'Inserted email not valid.');
      } else {
        //PASSED CLIENT SIDE VALIDATION
        this.#validatedFields.set(Login.FIELDS.EMAIL, true);
      }
    }
  }

  #validatePassword() {
    //EMPTY
    if (isEmpty(this.#password)) {
      this.#validatedFields.set(Login.FIELDS.PASSWORD, 'Password cannot be empty.');
    }
    //NOT EMPTY
    else {
      //INVALID CLIENT SIDE
      if (!isPasswordValid(this.#password)) {
        this.#validatedFields.set(Login.FIELDS.PASSWORD, 'Password must be at least 8 characters length,contain at least one upper-case, one lower-case, and one digit. ');
      } else {
        //PASSED CLIENT SIDE VALIDATION
        this.#validatedFields.set(Login.FIELDS.PASSWORD, true);
      }
    }
  }

  async #validateFirebase() {
    try {
      await login(this.#email, this.#password);
    } catch (error) {
      this.#validatedFields.set(Login.FIELDS.PASSWORD, "Email doesn't match the password");
      console.log(error);
    }
  }

  async validateForm() {
    this.#validateEmail();
    this.#validatePassword();
    if (this.#validatedFields.get(Login.FIELDS.PASSWORD) === true && this.#validatedFields.get(Login.FIELDS.EMAIL) === true) {
      await this.#validateFirebase();
    }
  }

  get validatedFields() {
    return this.#validatedFields;
  }
}
