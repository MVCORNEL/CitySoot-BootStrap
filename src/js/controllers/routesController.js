import routesModel from './../models/routesModel.js';
import routesView from './../views/routesView.js';

//function used to fetch data from the JSON file and afterwards to display it by invoking the routeView render method
//that will be be resposbile for rendering the routes dynamically
export const initRoutes = async () => {
  //I READIND DATA FROM THE DISK
  try {
    await routesModel.populateRouteList();
    const routes = routesModel.routeList;
    //II RENDER DATA
    routesView.render(routes);
  } catch (e) {
    console.log(e);
  }
};
