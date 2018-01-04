const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testInitial');

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
var User = mongoose.model("User", nameSchema);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
      .then(item => {
          console.log(myData.firstName);
          res.send("Name saved to database");
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
});

app.get("/users", (req, res) => {
User.find().where('firstName').equals('Jane').exec(function(err, result){
  if (err) return handleError(err);
  console.log(result);
})
});


new messages