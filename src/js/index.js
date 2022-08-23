import { initRoute } from './controllers/routeController.js';
import { initRoutes } from './controllers/routesController.js';
import { initFavs } from './controllers/favoritesController.js';
import { initGuides } from './controllers/guidesController.js';
import { initAuth, initUserState, initLogout } from './controllers/authController.js';
import { trackUserLogin, logOut } from './firebase.js';

const page = document.body.id;
//SET LOGOUT BTN FUNCTIONALITY
initLogout(logOut);
//SWITCH STATE OF A LOG IN WITH A NOT LOG IN USER
trackUserLogin(initUserState);

switch (page) {
  case 'index':
    break;
  case 'route':
    initRoute();
    break;
  case 'routes':
    initRoutes();
    break;
  case 'guides':
    initGuides();
    break;
  case 'login':
    initAuth();
    break;
  case 'favorites':
    initFavs();
    break;
}
