import guidesModel from './../models/guideModel.js';
import guidesView from './../views/guidesView.js';

//function used to read all the guides from the real time firebase service and sort them by calling the populateGuides methoids.
//all the guides will be displayed by using the  guide View  formatting methods
export const initGuides = async () => {
  //I READIND DATA FROM THE DISK
  try {
    await guidesModel.populateGuides();
    const guides = guidesModel.guidesList;
    // /II RENDER DATA
    guidesView.render(guides);
  } catch (e) {
    console.log(e);
  }
};
