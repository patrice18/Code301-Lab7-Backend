//below means that variables have to be first declared before anything can be assigned them
'use strict'

//creating an express application to interact with node.js for back end functionality. We are telling node to get/acces express API.
let express = require('express');

// requiring superagent libraby to be able to make Xhttp request to third party API's
let superagent = require('superagent');

//import cors to handle cross origin request
let cors = require('cors');
//invoking the method cors
app.use(cors());

//requiring the dotenv module and invoking the config method allowing us to add environment variables 
require('dotenv').config()

let app = express (); //creating the variable app, and giving it the value of the invoked express function. Now I have access to the Express module, meaning that I have an instance of the Express API and therefore I can call its methods on this page. 
//checking if my route is working, when i send a request will i get a response.
app.get('/',(request,response) => {
    response.send('this route is working')
})

// creating a PORT for my server to listen to 
let PORT = process.env.PORT  || 3000;

// Refractoring my previous code using a function to capure the qmy request, which is now called query.
function getLocation(query){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=Port-au-Prince&key=${process.env.GEOCODE_API_KEY}`
    superagent.get(url)
        .then(res => response.send({
            latitude: res.body.results[0].geometry.location.lat,
            longitude: res.body.results[0].geometry.location.lng
          }))
          .catch(err => response.send('<img src="http://http.cat/404" />'))
          
      }
//Refractoring to create an object conructor which will have instance of the two property I want from API instance  
function Location (lat,long){
    this.latitude= lat,
    this.longitude =long
} 

//Using/calling my getLocation function to send request to API to get the response from the API
app.get('/location', getLocation);
getLocation(request.query.data)
.then(res =>response.send(res))
.catch(err =>response.send(handleError(err)))



//access a PORT
app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
    console.log(process.env.GEOCODE_API_KEY)
})

//refractoring my object constructor for the Weather API
 function Weather(weatherObject) {
    this.hourly= weatherObject.hourly.summary,
    this.daily=weatherObject.daily.summary,
 }

//refractoring the weather third party request
function getWeather(query){
    let url1= `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/18.594395,-72.3074326`
    superagent.get(url)
    .then(res => response.send(new weather(res.body)
    ))
      .catch(err => response.send('<img src="http://http.cat/404" />'))
      
  }

  app.get('/weather', getWeather);
  getWeather(request.query.data)
  .then(res => response.send(res))
  .catch(res => response.send(handleError(err)))

