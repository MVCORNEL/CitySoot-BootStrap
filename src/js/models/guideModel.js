import { sanitizeData, validatedField, validatedArray } from './../helpers.js';
import { readGuides } from '../firebase.js';

export default class Guide {
  #firstName;
  #lastName;
  #age;
  #occupation;
  #blueBadge;
  #tours;
  #image;
  static #guidesList;

  constructor(firstName, lastName, age, occupation, blueBadge, tours, image) {
    this.#firstName = sanitizeData(validatedField(firstName));
    this.#lastName = sanitizeData(validatedField(lastName));
    this.#age = sanitizeData(validatedField(age));
    this.#occupation = sanitizeData(validatedField(occupation));
    this.#blueBadge = sanitizeData(validatedField(blueBadge));
    this.#image = sanitizeData(validatedField(image));
    this.#tours = sanitizeData(validatedArray(tours));
  }

  //function reads the guides from the realtime database and afterward validates them
  // Function taken from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  static async populateGuides() {
    try {
      const guides = await readGuides();
      this.#guidesList = guides.map((guide) => {
        //The route and coordinates class validation will run automatically on the data read
        return new Guide(guide.firstName, guide.lastName, guide.age, guide.occupation, guide.blueBadge, guide.tours, guide.image);
      });
    } catch (e) {
      //throw error further will be caught in the controller
      console.log(e);
      throw e;
    }
  }

  get firstName() {
    return this.#firstName;
  }
  get lastName() {
    return this.#lastName;
  }
  get age() {
    return this.#age;
  }
  get occupation() {
    return this.#occupation;
  }
  get blueBadge() {
    return this.#blueBadge;
  }
  get tours() {
    return this.#tours;
  }

  get image() {
    return this.#image;
  }
  static get guidesList() {
    return this.#guidesList;
  }
}
