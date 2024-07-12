//imports the userStore model
import { userStore} from "../models/user-store.js";

// renders the accountsController viewData and the index. This is the first page the user will see
export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "login or signup",
    };
    response.render("index", viewData);
  },
  
  
//renders the login-view page with the title. The user can enter there login details here.
  login(request, response) {
    const viewData = {
      title: "Login to the service",    
    };
    response.render("login-view", viewData);  
  },
  
// When the user logs out the session cookie expires and the user is redirected back to the index.
  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },
  
//The signup page is rendered with signup form and the title.
  signup(request, response) {
    const viewData = {
      title: "Sign up to the service",
    };
    response.render("signup-view", viewData);
  },
  
//the user information from the signUp is located, the userStore is then contacted and the details are added to the the store database.
//the user is then redirected back to the index where they are asked to login or signup. The user is created now and the details can be entered.
  async register (request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },
  
// This requests the user email that has been registered, if it is an email in the database it sets it a cookie for the session and logs in to this email.
// the user is then logged in and is directed to the dashboard or else if its the wrong info entered the user is directed to the login page.
  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },
  
// Gets the user's email address from a cookie named station.
// Uses this email to get the user's data from the user store.
// Returns the user's data after the promise is resolved.
  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};
