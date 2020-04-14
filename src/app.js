// imports
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const movie_database_request = require('./utils/movies.js');

/************************************
 * Make express application
 ************************************/
const app = express() // this makes express available
const port = process.env.PORT || 3001


/***********************************************
 * Making my different paths
 ********************************************/
const publicDirectory = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')  // set our express app to have this view engine
app.set('views', templatesPath); // default is views 
hbs.registerPartials(partialsPath);

/*********************************************
 * Setup static directory to server
 *********************************************/
app.use(express.static(publicDirectory)); // This will get the public path, and everything will be just right



/****************************
 * Different routes
 * 
 *****************************/
app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Nathan Swindall"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        message: "Do you need my help?", 
        name: "Nathan Swindall"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        message: "Hi, there. My name is Nathan and I love to learn new things",
        title: "About",
        name: "Nathan Swindall"
    })
})



// Notice that we use a bunch of shorthand notation here
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "No address was given for this app"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>
    {
        if(error)
        {
            return res.send({
                error
            })
        }
        //latitude longitude
        forecast(latitude,longitude, (error, {temperature, timezone, summary}) => {
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                summary,
                location,
                temperature,
                timezone
            })
        })
    })

})

app.get('/movies', (req, res) => {
    if(!req.query.imdb)
    {
        return res.send({
            error: "No imdb id given"
        })
    }

    movie_database_request(req.query.imdb,"title", (error, movie_info) => { // title is just a dummy variable here
        if(error)
        {
            return res.send({
                error: "bad imdb tag"
            })
        }
        
        res.send({
            title: movie_info.Title,
            genre: movie_info.Genre,
            rated: movie_info.Rated,
            language: movie_info.Language
        })
    })




})


app.get('/help/*', (req, res) => {
    res.render("status404", {
        message: "Sorry, there is not help document for the url you typed.",
        title: "404 page",
        name: "Nathan Swindall"
    })
})



app.get('*', (req, res) => {
    res.render("status404", {
        name: "Nathan Swindall",
        message: "404 sorry this page does not exist",
        title: "404 page"
    })

})

/*

challenge

1) select the second message p from JavaScript
2 Just beofre fetch, render loading message and empty p
3) If error, render error
4) if no error, render lacation and forecast
5) Test your work! Search for errors and for valid locations


Goal: Use input value to get weather

migrate fetch call into the submit callback
Use the search text as the address query string value
Submit the form with a valid and ivalid value to test

Goal: Fetch Weather

1.) Setup a call to fetch to fecth weather for Boston
2.) Get the parse JSON response
3.) if error property , print error
4.) If no error property, print location and forecast
refresh browswer for your work

CHALLENGES
1) require geocode/forecast into app.js
2) Use the address to geocode
3) Use the coordinates to get forecast
4) send back the real forecast and location



challenge query

Goal: update weather endpoing to accept address

1. No address? send back an error message
2. Address? Send back the static JSON
3.  - Add address property onto JSON which returns the provided address
4. Test /weather  and /weather?address= philidelphia


Crate and render a 404 page with handlebars

setup the template to render the header and footer
setup the template to render an error message in a paragraph
3. render the template for both 404 routes
    -page not found.
    -Help article not found
4. Test your work. Visit /what and /help/units


/***********************************************************************************
 * Starting the Server
 * Callback function prints to console
 ************************************************************************************/
app.listen(port, () => {
    console.log("The server is starting on port " + port)
});









/*
Chanllenge 1

1) create a html page for about with "About" title
2) create a html page with "Help" as a title
3) Remove the old route handlers for both
4) Visit both in the browswer to test your work

obsolete code

04/10/2020

// do some routes
app.get("", (req, res) => {
    res.send("Hello to Express buddy!, you finally made it here and I can here everything")
})


04/11/2020

// do some routes
// app.get("", (req, res) => {
//     res.send("Hello to Express buddy!, you finally made it here and I can here everything")
// })


// app.get("/about", (req,res) => {
//     res.send("About")
// })

*/