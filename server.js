///////////////////////
//DEPENDENCIES
//////////////////////
// What your app needs to bring in to function
require("dotenv").config(); //reads .env file environmental variables
const express = require("express"); //Brings in Express Library
const app = express(); //creates express application object
const morgan = require("morgan"); //Brings in Morgan Library
const cors = require("cors"); //Brings in CORS library
const mongoose = require('mongoose')


const PORT = process.env.PORT; 
const NODE_ENV = process.env.NODE_ENV;

const whitelist = ["http://localhost:3000/", "http://example2.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS, domain needs to be added to whitelist")
      );
    }
  },
};

/////////////////////
// MIDDLEWARE
////////////////////
//UTILITY FUNCTIONS THAT RUN BEFORE YOUR ROUTES
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));
// Enables websites in whitelist to make API calls to your server, enables all sites in development
app.use(express.json()); //Turns JSON from post/put/patch requests and converts them into req.body object
app.use(morgan("dev")); // Enables Morgan logging, creating more useful terminal logs while server runs
app.use(express.static("public")); //Allows static serving of files from public folder



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



