const validator = window.validator;
export const URI_ROUTES = 'src/data/routes.json';

//function used to create a XMLHTTP request object, if there is an error will return null
//@returns a XMLHttpRequest object or null
export const createXMLHttpRequest = () => {
  let xmlHttp;
  //check if the current version of the browser supports XMLHttpRequest
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  //user uses older version of the browser
  else if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  return xmlHttp || null;
};

//Promisified version function xml function used to read an return json data asynchronously
//@param - [xmlHttp] takes a valid XMLHttpRequest object
//@param - [url] takes a valid url, where the data will be read from
//@returns Javascript object
export const getJSON = (xmlHttp, url) => {
  return new Promise(function (resolve, reject) {
    xmlHttp.open('GET', url, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          resolve(JSON.parse(xmlHttp.responseText));
        } else {
          reject('Error. Could not perform the stated request');
        }
      }
    };
  });
};

//function used to take a unsanitized data and return the sanitize version if it, this function uses a 3rd party library called validator
//that will escape all the html elements, used to avoid XSS in case the. This function is design to sanitze String or Array of String
//@param - [dirt] takes a String or an Array
//return the sanitized version of the same String, Array taken as argument
export const sanitizeData = (dirt) => {
  if (Array.isArray(dirt)) {
    const cleanArray = [];
    dirt.forEach((element) => {
      cleanArray.push(validator.escape(element + '').trim());
    });
    return cleanArray;
  } else {
    //escape HTML characters and convert data into its string representation
    const clean = validator.escape(dirt + '').trim();
    return clean;
  }
};

//function used to validate a field, will check if the field is null or and empty string,
//if the field is valid will return the argument otherrwise will return 'Invalid'
//@param - [field] takes a String
//return a String
export const validatedField = (field) => {
  //NULL OR UNDEFINED
  if (field == null || field + '' === '') {
    return 'Invalid';
  }
  return field;
};

//function used to validate an array of String, firstly checks if it is a valid array with the size greater than 0
//the second stage consist in validating each individual element of the list
//@param - [array] takes an Array of Strings
//return an Array, or an array containing elements with the value of 'Invalid'
export const validatedArray = (array) => {
  //ARRAY AND NOT EMPTY
  if (!Array.isArray(array) || array.length === 0) {
    return ['Invalid'];
  }
  return array.map((el) => validatedField(el));
};

//function used to validate a pair of long lat coordinates. This function uses a third party libreary called validator
//returns  the same array of coordinates or an Array with Invalid String instead of coordinates if the coordinates are not valid
//@param - [coords] takes an Array, that will represent lat long, lat long can be Strings or Integers
//return same Array
export const validatedCoords = (coords) => {
  //ARRAY OR NOT EMPTY
  if (!Array.isArray(coords) || coords.length === 0) {
    return ['Invalid', 'Invalid'];
  } else {
    //CHECK FOR LEGIT COORDINATES
    let [lat, long] = [...coords];
    //VALID COORDINATES more on -> https://www.npmjs.com/package/validator
    if (validator.isLatLong(lat + ',' + long)) {
      return [lat, long];
    } else {
      return ['Invalid', 'Invalid'];
    }
  }
};

//function used to determine if a String value is "" empty, if so return true, otherwise returns false
//@param - [value] takes a valid String value
//return  boolean
export const isEmpty = (value) => {
  //EMPTY STRING - check only their string representation
  if ('' + value.trim() === '') {
    return true;
  }
  return false;
};

//function verifies a regular expression representing an email pattern against a given string andd returns true
//if the pattern matches and false otherwise
//@param - [email] takes valid String value
//return boolean
export const isEmailValid = (email) => {
  //  PERSONALLY DESIGNED SOLUTION.THE SOLUTION SHOULD COVER ALMOST EVERY NON-FANCY EMAIL ADDRESSES.
  //  WARNING -> NEGATIVE LOOK BEHIND WAS USED IN THE LAST PART OF THE REGEX. WHICH MAY NOT BE FULLY SUPPORTED BY THE OLD VERSION OF THE BROWSERS.
  //  SOLUTION DOESN'T VALIDATE: SPACES WITHIN THE QUOTES, DOUBLE DOTS BETWEEN THE QUOTES, COMMENTS AND IP ADDRESSES AS DOMAINS.
  //  REGEX  :  ^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}@(?!\-|,)(([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$
  //	EACH EMAIL ADDRESS IS COMPUND BY 3 ELEMENTS-> [LOCAL-PART][@][DOMAIN-PART]
  //  1 LOCAL-PART
  //  ^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}
  //  ^  :  beginning of the string
  // 	(?!\.)  :  first character cannot be dot.
  //  [a-zA-Z0-9]  :  lower case and uppercase letters a to z and A to Z, but also digits from 0 to 9 are allowed.
  //  [!#=%&_'`/~\*\$\+\-\?\^\{\|\}] : all printable characters allowed for a valid email local part. All java-script special characters were escaped by using backslash(\).
  //  .(?!.|@)  :  dot character cannot be followed by another dot(.) cahracter or at(@) character.Look ahead negative checks the following element in case the current element is dot(.) and validates true only if the following elements are not . or @.
  //  {1,64}  :  range specified must be between minimum one character maximum 64.
  //  2 @-PART
  //  @(?!\-|,)  :  At(@) character cannot be follow by - or , character. That is more a domain rules, handled here in advance, in order to not use negative look behind in domain part.
  //  3 DOMAIN-PART
  //  (([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$
  //  [a-zA-Z0-9]  :  rage of character lower case and uppercase letters a to z and A to Z, but also digits from 0 to 9 are allowed.
  //  \.(?!\.)  :  dot can be used, but only if it is not followed by another dot. Negative look ahead assertion used.
  //  (\-|,)(?!\-|,)  :  Dash and comma can be used only if they are not followed by another dash or comma. Negative look ahead assertion used .
  const EMAIL_REGEX = /^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}@(?!\-|,)(([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$/;
  return EMAIL_REGEX.test(email);
};

//function verifies a regular expression representing a password pattern against a given string andd returns true if the pattern matches and false otherwise.
//The password must be 8 character length,include at least one upper-case,at least one lower-case, and at least one digit.
//@param - [email] takes valid String value
//@returns boolean
export const isPasswordValid = (password) => {
  //(?=.*[a-z]) positive look ahead used to check if there is at least one letter between a-z
  //(?=.*[A-Z])  positive look ahead used to check if there is at least one letter between A-Z
  //(?=.*[0-9]) positive look ahead used to check if there is at least one digit between 0-9
  //. usd to specify that the password can be of any type of characters , and {8} password range.
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  return PASSWORD_REGEX.test(password);
};

//function generates a error markup
//@param - [message] message contained by the error
//@returns String
export const getErrorMarkup = (message) => {
  return `        
        <div class="err mt-5">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon err-icon" viewBox="0 0 16 16">
              <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
              </div>
              <p class="lead fw-bold">${message}</p>
          </div>`;
};
