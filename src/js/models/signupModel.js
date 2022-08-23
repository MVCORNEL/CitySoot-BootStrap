import { sanitizeData, isEmpty, isEmailValid, isPasswordValid } from '../helpers.js';
import { signup } from './../firebase.js';

export default class Signup {
  static FIELDS = { FNAME: 'firstname', LNAME: 'lastname', EMAIL: 'email', PASSWORD: 'password', PASSWORD_CONFIRM: 'password_confirm' };
  #fname;
  #lname;
  #email;
  #password;
  #confirmPassword;
  #validatedFields;

  //Data sanitization is done within the constructor
  constructor(fname, lname, email, password, confirmPassword) {
    this.#fname = sanitizeData(fname);
    this.#lname = sanitizeData(lname);
    this.#email = sanitizeData(email);
    this.#password = sanitizeData(password);
    this.#confirmPassword = sanitizeData(confirmPassword);
    this.#validatedFields = new Map();
  }

  //function used to perform client side validation of the firstname field, by checking if the field is empty
  //if the field is invalid it will be added to a list with the error message, othewise with a true value
  #validateFirstName() {
    //EMPTY
    if (isEmpty(this.#fname)) {
      this.#validatedFields.set(Signup.FIELDS.FNAME, 'First name cannot be empty.');
    } else {
      //PASSED CLIENT SIDE VALIDATION
      this.#validatedFields.set(Signup.FIELDS.FNAME, true);
    }
  }

  //function used to perform client side validation of the lastName field, by checking if the field is empty
  //if the field is invalid it will be added to a list with the error message, othewise with a true value
  #validateLastName() {
    //EMPTY
    if (isEmpty(this.#lname)) {
      this.#validatedFields.set(Signup.FIELDS.LNAME, 'LAst name cannot be empty.');
    } else {
      //PASSED CLIENT SIDE VALIDATION
      this.#validatedFields.set(Signup.FIELDS.LNAME, true);
    }
  }

  //function used to perform client side validation of the email field, by checking if the field is empty and validating the email itself
  //if the field is invalid it will be added to a list with the error message, othewise with a true value
  #validateEmail() {
    //EMPTY
    if (isEmpty(this.#email)) {
      this.#validatedFields.set(Signup.FIELDS.EMAIL, 'Email cannot be empty.');
    }
    //NOT EMPTY
    else {
      //BUT INVALID
      if (!isEmailValid(this.#email)) {
        console.log('NOT EMPTY EMAIL BUT INVALID');
        this.#validatedFields.set(Signup.FIELDS.EMAIL, 'Inserted email not valid.');
      } else {
        //PASSED CLIENT SIDE VALIDATION
        this.#validatedFields.set(Signup.FIELDS.EMAIL, true);
      }
    }
  }

  //function used to perform client side validation of the password field, by checking if the field is empty and if it has the required format
  //if the field is invalid it will be added to a list with the error message, othewise with a true value
  #validatePassword() {
    //EMPTY
    if (isEmpty(this.#password)) {
      this.#validatedFields.set(Signup.FIELDS.PASSWORD, 'Password cannot be empty.');
    }
    //NOT EMPTY
    else {
      //INVALID CLIENT SIDE
      if (!isPasswordValid(this.#password)) {
        this.#validatedFields.set(Signup.FIELDS.PASSWORD, 'Password must be at least 8 characters length,contain at least one upper-case, one lower-case, and one digit. ');
      } else {
        //PASSED CLIENT SIDE VALIDATION
        this.#validatedFields.set(Signup.FIELDS.PASSWORD, true);
      }
    }
  }

  //function used to perform client side validation of the password field, by checking if the field is empty and the same with the password field
  //if the field is invalid it will be added to a list with the error message, othewise with a true value
  #validateConfirmPassword() {
    //EMPTY
    if (isEmpty(this.#confirmPassword)) {
      this.#validatedFields.set(Signup.FIELDS.PASSWORD_CONFIRM, 'Password cannot be empty.');
    } else {
      //INVALID CLIENT SIDE
      if (this.#password !== this.#confirmPassword) {
        this.#validatedFields.set(Signup.FIELDS.PASSWORD_CONFIRM, 'Confirm password does not match with password.');
      } else {
        //PASSED CLIENT SIDE VALIDATION
        this.#validatedFields.set(Signup.FIELDS.PASSWORD_CONFIRM, true);
      }
    }
  }

  //function used to perform server side validation, this function will try sign to user in
  //if the operation doesn't succed an error wil be returned.
  async #validateFirebase() {
    try {
      await signup(this.#email, this.#password, `${this.#lname} ${this.#lname}`);
    } catch (error) {
      this.#validatedFields.set(Signup.FIELDS.EMAIL, 'Email already in use');
      console.log(error);
    }
  }

  //function used to call all the form client side validation methods, if all the fields passed validation the back-end firebase validation will start
  //if the firebase validation proceeds further, the authetification was successful and the user successfullt signed up
  async validateForm() {
    this.#validateFirstName();
    this.#validateLastName();
    this.#validateEmail();
    this.#validatePassword();
    this.#validateConfirmPassword();
    //FIREBASE VALIDATION IF THE CLINET PASSED
    if (
      this.#validatedFields.get(Signup.FIELDS.FNAME) === true &&
      this.#validatedFields.get(Signup.FIELDS.LNAME) === true &&
      this.#validatedFields.get(Signup.FIELDS.EMAIL) === true &&
      this.#validatedFields.get(Signup.FIELDS.PASSWORD) === true &&
      this.#validatedFields.get(Signup.FIELDS.PASSWORD_CONFIRM) === true
    ) {
      await this.#validateFirebase();
    }
  }

  //function return the private list of validate fields, representing all validation data occured the validation process
  //return array
  get validatedFields() {
    return this.#validatedFields;
  }
}
