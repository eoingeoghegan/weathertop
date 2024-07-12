import {userStore} from "../models/user-store.js";
import {stationStore} from "../models/station-store.js";

// This works by requesting getting the user's email from a cookie named station.
// The cookie is used to store the user's email. The users email is located from the Store and all this info is render for the user.
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
  
 // The users email is retrieved from the cookie, the user is located in the store by email
//  The current info is displayed and then new info can be entered in the form.
// When submitted the user is directed to the dahsboard while the infe goes to the UserStore where is it updates using the update function.
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