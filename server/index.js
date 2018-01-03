const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req ', req.body);
  var username = req.body['username'];
  console.log('In server ', username);
  if (username === '') {
    res.status(400).json();
  }else {
    console.log('helpers ', helpers);
    helpers.getReposByUsername(username, (err, repos) => {
      console.log('db ', db);
      db.save(repos);
      res.status(201).json();
    });
  }
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // db.find
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

