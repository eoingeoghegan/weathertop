// aboutController is exported and can be imported elsewhere. 
// The index will render the viewData: title"About WeatherTop" and the about-view.

export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About WeatherTop",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};

