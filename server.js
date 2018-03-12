const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const AddBook = require('./api/AddBook');
const AddReview = require('./api/AddReview');
const GetBookData = require('./api/GetBookData');
const GetReviews = require('./api/GetReviews');
const dbConnectionDetails = require('./config/Dbconfig.js');

const app = express();
var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(
  function(req, res, next){
    allowCrossDomain(req, res, next);
    express.static(path.join(__dirname, 'build'));
  }
  );

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const mysql = require('mysql');

// Set up connection to database.
const connection = mysql.createConnection(dbConnectionDetails());


// Connect to database.
// connection.connect();

// Listen to POST requests to /users.
app.post('/add-user', function(req, res) {
  // Get sent data.
  var user = req.body.username;
  // Do a MySQL query.
  // console.log(user,"INSERT INTO users (`user_name`) VALUES ("+user+")");
  /*var query = connection.query("INSERT INTO users (`user_name`) VALUES ('"+user+"')", function(err, result) {
    // Neat!
  });*/

  var query = connection.query("INSERT INTO users (`user_name`) VALUES ('"+user+"')", function(err, result) {
    // console.log(err, result);
      if(err){
        res.status(500).send('Error!');
      }
  });


  res.end('Success yeah!');
});

// Listen to POST requests to /users.
app.post('/add-book', function(req, res) { // add book
  var output = AddBook(req, res, connection);
  console.log("after calling AddBook", output)
 
  //res.end('Success yeah!');
});

app.post('/add-review', function(req, res) { // add review
  AddReview(req, res, connection);
});

app.post('/get-books', function(req, res) { // add review
  GetBookData(req, res, connection);
});

app.post('/get-reviews', function(req, res) { // add review
  GetReviews(req, res, connection);
});

app.listen(process.env.PORT || 8081);