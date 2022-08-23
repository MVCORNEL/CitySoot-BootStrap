import routesModel from './../models/routesModel.js';

export default class Favorites {
  static #favList = [];

  static async populateFavList() {
    //I READIND DATA FROM THE DISK
    try {
      await routesModel.populateRouteList();
      const routes = routesModel.routeList;
      //II FILTER ONLY THE FAVORIT ROUTES
      const storage = localStorage.getItem('routes');
      if (routes && storage) {
        const storageFavs = JSON.parse(storage);
        //USE ONLY THE FAVED ROUTES
        routes.forEach((route) => {
          for (let favName of storageFavs) {
            //The routes is on the favorites list within the storage
            if (route.name === favName) {
              this.#favList.push(route);
              break;
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  //function used to remove an element from the local storage, representing a route
  //param [slug] String with the format of a-b-c-d
  static removeFavoriteFromStorage(slug) {
    let storage = localStorage.getItem('routes');
    if (storage) {
      let favs = JSON.parse(storage);
      for (let i = 0; i < favs.length; i++) {
        const slugFromFav = favs[i].replaceAll(' ', '-');
        if (slugFromFav.toLowerCase() === slug) {
          favs.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('routes', JSON.stringify(favs));
    }
  }

  //function return the private list of validate fields, representing all validation data occured the validation process
  //return array
  static get favList() {
    return this.#favList;
  }
}
