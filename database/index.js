const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  login: String,
  url: String,
  Repos : {
    id: Number,
    fullname: String,
    created_at: Date,
    updated_at: Date,
    forks: Number
  }
});

let Repo = mongoose.model('Repo', repoSchema);
//Assumption is that the controller will either
//send the repos as an object or an array of objects
//that conform to the schema
let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (Array.isArray(data)) {
    data.forEach(function(document) {
      saveDocument(document);
    });
  } else {//single document
    saveDocument(data);
  } 
}
//assumption is that data will be sent through by the controller 
//as an array of objects
let saveDocument = (data) => {
  var repo = new Repo(data);
  repo.save( (err) => {
    if (err) {
      return handleError(err);
    }
  });
}
module.exports.save = save;