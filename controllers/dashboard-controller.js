export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop Dashboard",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addStation (request, response) {
    const newStation = {
      title: request.body.title,    
  };
  console.log(`adding station ${newStation.title}`);
  response.redirect("/dashboard");
},
};
