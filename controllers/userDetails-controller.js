import {userStore} from "../models/user-store.js";
import {stationStore} from "../models/station-store.js";

export const userDetailsController = {
 async index(request, response) {
    const userEmail = await request.cookies.station;
    const user = await userStore.getUserByEmail(userEmail);
    const viewData = {
      title: "Update Details",
      user: user,
      userEmail: userEmail,
    };
    response.render("updateUser-view", viewData);
  },
  
   async update(request, response) {
     const userEmail = await request.cookies.station;
    const user = await userStore.getUserByEmail(userEmail);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    console.log(`Updating User details!-id:${user._id}`);
    
    await userStore.updateUserDetails(user, updatedUser);
    response.redirect("/dashboard/");
  },
};