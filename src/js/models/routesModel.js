import Route from './routeModel.js';
import { URL_ROUTES } from './../config.js';
import { createXMLHttpRequest, getJSON } from './../helpers.js';

export default class Routes {
  static #routeList;

  static async populateRouteList() {
    try {
      //Create connection and read the data from the disk asynchronouslty using ES8 async/await feature
      const xmlHttpReq = createXMLHttpRequest();
      const data = await getJSON(xmlHttpReq, URL_ROUTES);
      //Save the state -> good behaviour avoiding data mutation
      this.#routeList = data.routes.map((route) => {
        //The route and coordinates class validation will run automatically on the data read
        return new Route(route.name, route.day, route.time, route.highlights, route.image, route.coordinates.start, route.coordinates.end);
      });
    } catch (e) {
      //throw error further will be caught in the controller
      throw e;
    }
  }

  //function return the private list of validate fields, representing all validation data occured the validation process
  //return array
  static get routeList() {
    return this.#routeList;
  }
}
