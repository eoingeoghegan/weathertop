import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";

// The dasboard controller viewPage index locates the loggedInUser, locates the stations from the stationStore for that logged in User,
//   Attempting to add latestReport data to the cards in the dashboard but unable yet.
export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationByUserId(loggedInUser._id);
      
       
     
  
 
// this allows th stations titles to be sorted in alphabetical order using sort(). 
// It compares the titles so if the a.title < b.title then a comes before b giving -1. 
// It gives +1 if a.title > b.title meaning a comes after b. it conntinues this for all the titles.

    stations.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
});
   
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations,
      
    };
    console.log(loggedInUser);
    
     
    console.log("dashboard rendering with the stations:", stations);
    response.render("dashboard-view", viewData);
  
  },

// This works by  requesting the logged in users information from database, in the dashboard-view the user can add details of a staation and add it.
// When info is added it goes to the stationStore addStation function and its the newStation here to the database.
// The user is then redirected to the dashboard.
  async addStation (request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
  };
  console.log(`adding station ${newStation.title}`);
  await stationStore.addStation(newStation);
  response.redirect("/dashboard");
},
  
// The stations Id is request and then it goes to the stationStore where it carries out the deleteStation by Id function.
// The user is then redirected to the dashboard and the station selected should be removed.
  async deleteStation(request, response) {
    const stationId = request.params.id;
  console.log(`deleting station ${stationId}`);
   await stationStore.deleteStationById(stationId);  
    response.redirect("/dashboard");
},
};

