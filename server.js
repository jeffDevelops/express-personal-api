// require express and other modules
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    profileData = require('./seed.js'),
    methodOverride = require('method-override');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

/************
 * DATABASE *
 ************/


var db = require('./models/index.js');

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
app.get('/api/profile', function(req, res) {
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

//VSTS CREATE ROUTE
app.post('/api/vsts', function(req, res) {
  var newVST = new db.VST({
    title: req.body.title,
    developer: req.body.dev,
    function: req.body.function
  });
  console.log(req.body.title);
  console.log(newVST);
  newVST.save(function(err, doc) {
    if (err) {
      return console.log(err);
    }
    console.log('saved ', doc.title);
    res.json(doc);
  });
});

//VSTS UPDATE ROUTE
app.put('/api/vsts', function(req, res) {
  var vstToEdit = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
  db.VST.find({title: vstToEdit}, function(err, docs) {
    if (!docs || docs.length === 0) {
      return;
    }
    docs.dev = req.body.devy;
    docs.function = req.body.functiony;
    console.log(doc);
    db.VST.update(doc);
    console.log(doc.body);
    res.json(doc);
  });
});

//VSTS DELETE ROUTE
app.delete('/api/vsts/:id', function(req, res) {
  console.log("Byebye" + req.params.id);
  var vstToDelete = req.params.id;
  db.VST.findOneAndRemove({ _id: req.params.id }, function(err, doc) {
    if(err) {
      console.log(err);
      return err;
    }
    res.json(doc);
  });
});


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
