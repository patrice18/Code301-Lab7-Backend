//below means that variables have to be first declared before anything can be assigned them
'use strict'

//creating an express application to interact with node.js for back end functionality. We are telling node to get/acces express API.
let express = require('express');
let app = express (); //creating the variable app, and giving it the value of the invoked express function. Now I have access to the Express module, meaning that I have an instance of the Express API and therefore I can call its methods on this page. 

// reuiring superagent libraby to be able to make Xhttp request to thirs party API's
let superagent = require('superagent');

//import cors to handle cross origin request
let cors = require('cors');
//invoking the method cors
app.use(cors());


//requiring the dotenv module and invoking the config method allowing us to add environment variables 
require('dotenv').config()

//import Mongoose in order to interact with MongoDB
let mongoose = require('mongoose');

//accessing the schema property in the mongoose library to easily create new entries in our database
let Schema = mongoose.Schema;

//connecting mongoose to our database
 mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds155903.mlab.com:55903/301-demo`)
 let db=mongoose.connection
//always a good idea to set up error handling. This is the first thing to do because if something goes wrong it will let you know. 
//think of dbon() as an event listener, expecting 2 arguments- the first one is once event happens (which is an error in this case), then run the second, which is a function/callback
db.on('error',() => console.log('there has been an erro'))
db.once('open',()=>{
    console.log('DB is connected')
});


//checking if my route is working, when i send a request will i get a response.
app.get('/',(request,response) => {
    response.send('this route is working')
})

// creating a PORT for my server to listen to 
let PORT = process.env.PORT  || 3000;



//sending the request to access the third API, and getting the API response to us the client
app.get('/location', (request,response) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=Port-au-Prince&key=${process.env.GEOCODE_API_KEY}`
    superagent.get(url)
    .then(res => response.send({
        latitude: res.body.results[0].geometry.location.lat,
        longitude: res.body.results[0].geometry.location.lng
      }))
      .catch(err => response.send('<img src="http://http.cat/404" />'))
      
  })

  //saving our location data to the mongo DB database and creating all the blueprints that are going to be on this data object
  let locationSchema = new Schema ({
      addess: String,
      latitude: Number,
      longitude: Number,
  })
mongoose.model('location', locationSchema);

  
//   function handleError(err){
//     return ({error:err, messaage: 'something broke!!'})
//   }

//access a PORT
app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
    console.log(process.env.GEOCODE_API_KEY)
})
// .catch(err)

//sending request to the weather third party API, to get me the response of the weather in PAP. 
app.get('/weather',(request,response)=>{
    let url1= `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/18.594395,-72.3074326`
    superagent.get(url1)
    .then(res => response.send({
        hourly: res.body.hourly.summary,
        daily: res.body.daily.summary,
      }))
})