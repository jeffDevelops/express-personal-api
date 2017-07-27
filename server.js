// require express and other modules
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    profileData = require('./seed.js');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/


var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//PROFILE SHOW ROUTE
app.get('/profile', function(req, res) {
  res.json(profileData);
});

//VSTS INDEX ROUTE
app.get('/api/vsts', function(req, res) {
  db.VST.find({}, function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.json(docs);
  });
});

//VSTS SHOW ROUTE
app.get('/api/vsts/:vstName', function(req, res) {
  var searchedVST = req.params.vstName.charAt(0).toUpperCase() + req.params.vstName.slice(1); //We have to capitalize the first letter of the request string for search results to appear
  console.log(searchedVST);
  db.VST.find({ title: searchedVST }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
  });
});

//VSTS 


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "http://github.com/jeffDevelops/express-personal-api", 
    base_url: "https://thawing-dawn-25787.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My Stats"},
      {method: "POST", path: "/api/vsts", description: "Here, you'll find a listing of virtual studio technologies I use to make music. This part of my API is CRUD-able. So, if you would like to recommend some cool VSTs, please do. I guess if you hate one of the VSTs I use, you can delete it, because my assignment requires a DELETE method, but hopefully you won't feel passionate enough to do so."}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
