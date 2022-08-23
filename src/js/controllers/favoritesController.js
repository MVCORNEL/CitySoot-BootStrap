import favoritesModel from './../models/favoritesModel.js';
import favoritesView from './../views/favoritesView.js';

//function used to remove a favorite route from the local storage, and refresh the page afterwards
const controlRemoveFav = (name) => {
  favoritesModel.removeFavoriteFromStorage(name);
  location.reload();
};

//function is used to read all the favorite routes from the local storage and render them accordingly by using the view methods
//this function is a middleware between the view and the model, keeping them detach one of another
export const initFavs = async () => {
  //I READIND DATA FROM THE DISK
  try {
    await favoritesModel.populateFavList();
    const favs = favoritesModel.favList;
    // //II RENDER DATA
    favoritesView.render(favs);
  } catch (e) {
    console.log(e);
  }
  //REMOVE FAV LISTENER
  favoritesView.addRemoveFavListener(controlRemoveFav);
};
