import { createXMLHttpRequest, getJSON, sanitizeData, validatedField, validatedArray, validatedCoords } from './../helpers.js';
import { URL_ROUTES } from './../config.js';
const validator = window.validator;

export default class Route {
  #name;
  #startCoords;
  #endCoords;
  #day;
  #time;
  #highlights;
  #image;
  #slug;

  constructor(name, day, time, highlights, image, startCoords, endCoords) {
    //DATA VALIDATION AND SANITIZATION
    this.#name = sanitizeData(validatedField(name));
    this.#day = sanitizeData(validatedField(day));
    this.#time = sanitizeData(validatedField(time));
    this.#image = sanitizeData(validatedField(image));
    this.#highlights = sanitizeData(validatedArray(highlights));
    this.#startCoords = sanitizeData(validatedCoords(startCoords));
    this.#endCoords = sanitizeData(validatedCoords(endCoords));
    //INIT DATA(SLUG AND IMG URL)
    this.#createSlug();
  }

  //This method is used to create a slug that will be server as a unique identifier for the the resource being served
  #createSlug() {
    this.#slug = this.name.replaceAll(' ', '-').toLowerCase();
  }

  //Search
  static async searchForRoute(slug) {
    try {
      //Create connection and read the data from the disk asynchronouslty using ES8 async/await feature
      const xmlHttpReq = createXMLHttpRequest();
      const data = await getJSON(xmlHttpReq, URL_ROUTES);
      //Save the state -> good behaviour avoiding data mutation
      const route = data.routes.find((route) => {
        return route.name.replaceAll(' ', '-').toLowerCase() === slug;
      });
      //The route and coordinates class validation will run automatically on the data read
      return new Route(route.name, route.day, route.time, route.highlights, route.image, route.coordinates.start, route.coordinates.end);
    } catch (e) {
      //throw error further will be caught in the controller
      console.log(e);
      throw e;
    }
  }

  //function adapted from Mobile Web Application Development SESSION 6
  addToFavorite() {
    let routes;
    if (localStorage.getItem('routes') === null) {
      routes = new Array();
    } else {
      routes = JSON.parse(localStorage.getItem('routes'));
    }
    //Item doesnt exist in the storage
    if (routes.indexOf(this.#name) == -1) {
      routes.push(this.#name);
      localStorage.setItem('routes', JSON.stringify(routes));
      return 'The element has been successfully added to the fav list !';
    } else {
      //Item already existsin the storage
      return 'ELement already exists at the favorites';
    }
  }

  get name() {
    return this.#name;
  }
  get startCoords() {
    return this.#startCoords;
  }
  get endCoords() {
    return this.#endCoords;
  }
  get day() {
    return this.#day;
  }
  get time() {
    return this.#time;
  }
  get highlights() {
    return this.#highlights;
  }
  get image() {
    return this.#image;
  }
  get slug() {
    return this.#slug;
  }
}
