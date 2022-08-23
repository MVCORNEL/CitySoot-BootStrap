import routeView from './../views/routeView.js';
import routeModel from './../models/routeModel.js';
import favoritesModel from './../models/favoritesModel.js';

let route;

//function used to add to the the storage a route
const controlAddFav = function () {
  return route.addToFavorite();
};

//function reads a route from JSON file based and a a query string. The obtained route will be displayed using rendering methods belonging to the view clas
// Function taken from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export const initRoute = async () => {
  try {
    //GET ROUTE FROM QUERY STRING
    const urlSearchParam = new URLSearchParams(window.location.search);
    const routeQuery = urlSearchParam.get('route');
    route = await routeModel.searchForRoute(routeQuery);
    //RENDER ROUTE
    routeView.render(route);
    //FAVORITE CONTROL
    routeView.addFavoriteListener(controlAddFav);
    //RENDER FAVORITES
    await favoritesModel.populateFavList();
    const favs = favoritesModel.favList;
    routeView.renderFavorites(favs);
  } catch (e) {
    console.log(e);
  }
};
