# WeatherTop 
WeatherTop Station Application
Release 1, 2, 3 and 4 mostly complete.


This app allows the user to create weather stations and record weather reports manually.
The user can create an account, update their details and view there stations and weather reports saved to their account.

Deployed site: https://weatherstation-assignment.glitch.me/


Example of what the project should look like:<br>
user : egghead100@gmail.com<br>
pass: 1111

The map is hardcoded with locations and does not update when a new station is entered


## Bugs

1) When the email is updated the it shows that the site isnt repsponding, however it saves the new email entered.If you logout you can log back in with the new email address.
<br>** Updated email redirects to the signup/login page and any other changes reutns to dashboard.

2) Any information that is saved in file.json sometimes takes a while to show however it works.

## References

1) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString Helped with getting a timestamp 

2) https://www.freecodecamp.org/news/how-to-sort-array-of-objects-by-property-name-in-javascript/ helped with sorting the station titles in alphabetical order

3) https://leafletjs.com/examples/quick-start/ This show me a tutorial how to insert a map to the project.