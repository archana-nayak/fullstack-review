const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-uni')
mongoose.connect('mongodb://localhost/fetcher');
// const db = mongoose.connection();
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, require: true, index:{unique: true}} ,
  login: {type: String},
  handle_url: String,
  Repos : [{
    repo_id: {type: Number},
    repo_name: String,
    created_at: Date,
    updated_at: {type: Date},
    forks_count: Number,
    html_url: String
  }]
});

let Repo = mongoose.model('Repo', repoSchema);
//Assumption is that the controller will either
//send the repos as an object or an array of objects
//that conform to the schema
let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log("in db,save method ", typeof data.id);
  var repo = new Repo(data);//very important
  repo.save( (err) => {
    if (err) {
      return handleError(err);
    }
  });
}

module.exports.Repo = Repo;
module.exports.save = save;