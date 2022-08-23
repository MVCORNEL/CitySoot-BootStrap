import loginView from '../views/loginView.js';
import Login from '../models/loginModel.js';
import signupView from '../views/signupView.js';
import Signup from '../models/signupModel.js';
import authView from '../views/authView.js';

//function used to validate and sanitize the login  form, by invoking methods from the model class
//this function is also resposible for the user login authetification but also for displaying erorr by invoking the view class methods
//this function take data from the view, it processes in on the model, and afterwards sends the faulty data again to the view
//In this manner the model and view are completely decoupled
const controlLogin = async () => {
  const email = loginView.email;
  const password = loginView.password;

  const login = new Login(email, password);
  await login.validateForm();
  const fields = login.validatedFields;

  fields.forEach((isValid, key) => {
    if (key === Login.FIELDS.EMAIL) {
      loginView.setEmailError(isValid);
    }
    if (key === Login.FIELDS.PASSWORD) {
      loginView.setPasswordError(isValid);
    }
  });
};

//function used to validate and sanitize the sign in form, by invoking methods from the model class
//this function is also resposible for the user signup authetification but also for displaying erorr by invoking the view class methods
//this function take data from the view, it processes in on the model, and afterwards sends the faulty data again to the view
//In this manner the model and view are completely decoupled
const controlSignup = async () => {
  const fname = signupView.fname;
  const lname = signupView.lname;
  const email = signupView.email;
  const password = signupView.password;
  const confirmPassword = signupView.confirmPassword;

  const signup = new Signup(fname, lname, email, password, confirmPassword);
  await signup.validateForm();
  const fields = signup.validatedFields;

  fields.forEach((isValid, key) => {
    switch (key) {
      case Signup.FIELDS.FNAME:
        signupView.setFirstNameError(isValid);
        break;
      case Signup.FIELDS.LNAME:
        signupView.setLastNameError(isValid);
        break;
      case Signup.FIELDS.EMAIL:
        signupView.setEmailError(isValid);
        break;
      case Signup.FIELDS.PASSWORD:
        signupView.setPasswordError(isValid);
        break;
      case Signup.FIELDS.PASSWORD_CONFIRM:
        signupView.setConfirmPasswordError(isValid);
        break;
    }
  });
};

//function used track if the user is log or not in. THis function will be resposible for changing the state of a logged and not logged in user
export const initUserState = (isLogged, message) => {
  authView.setStateText(isLogged, message);
  authView.toggleLoginLogout(isLogged);
};

//function used pass a handler function that will be executed when either of the login, signup buttons are pressed
export const initAuth = () => {
  signupView.addSigninListener(controlSignup);
  loginView.addLoginListener(controlLogin);
};

//function used pass a handler function that will be executed when the logOut butotns is pressed
export const initLogout = (handler) => {
  authView.addLogoutEventListener(handler);
};
