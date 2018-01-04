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
    //check if user exists
    checkIfUserExists(username, (err, repos) =>  {
      if (repos.length) {
        //there are repos
        console.log('repos from database ', repos);
        res.status(201).send(repos);
      } else {
        //there are no users
        //make call to github api
        // console.log('helpers ', helpers);
        helpers.getReposByUsername(username, (err, repos) => {
          // console.log('db ', db);
        convertDataForInsertionIntoDB(repos, (err, params) => {
          console.log('just before call to db params ', params);
          db.save(params);
        });
        res.status(201).json();
        });
      }
    }); 
  }  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // db.find
  var username = req.body['username'];
  checkIfUserExists(userame, (err, repos) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//TODO: create a hash or map of usernamehandles and boolean
//to check if user exists instead of querying the database;
let checkIfUserExists = (username, callback) => {
  // console.log('db.Repo ', db.Repo);
  var query = {"login": username};
  db.Repo.find(query, (err, repos) => {
    if (err) {
      callback(err, null); //res.status(500).send(err); It means there was an error
    }//in the database
      console.log('repos in database ', repos);
      callback(null, repos);//res.status(200).send(repos);
  });//.sort(-);
}


let convertDataForInsertionIntoDB = (data, callback) => {
  
  // console.log('data, ', data);
  var reposForUser = [];
  var userParams;
  data.forEach((repo) => {
    // console.log('\n\n\n\n repository ', repo);
    if (!userParams) { //get the user data only the first time
      userParams = {login: repo.owner['login'], id: repo.owner['id'],
       handle_url: repo.owner['url']}; 
    }   
    //create Repos as an array and push values into it
    var reposParams = {};
    reposParams['repo_id'] = repo['id'];
    reposParams['repo_name'] = repo['name'];
    reposParams['created_at'] = repo['created_at'];
    reposParams['updated_at'] = repo['updated_at'];
    reposParams['forks_count'] = repo['forks_count'];
    reposParams['html_url'] = repo['html_url'];
    reposForUser.push(reposParams);
  });
  userParams['Repos'] = reposForUser;//array of repos attached to the user
  console.log('userParams ', userParams);
  callback(null, userParams);  
}


// let requestGitHubForData = (username, callback) => {
  
// };
