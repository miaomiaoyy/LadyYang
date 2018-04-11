const express    = require('express');
const path       = require('path');
const http       = require('http');
const bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');
 var session      = require('express-session');
var passport     = require('passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize()); 
app.use(passport.session());

app.use(cookieParser()); 
//app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({
  secret: process.env.SESSION_SECRET || "This is a secret",
  resave: true,
  saveUninitialized: true
}));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src/assets')));




// CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");//local use http://localhost:4200 to replace *
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

//var serverSide = require("./server/test-mongodb/app");
//serverSide(app);




// var webmaker = require('./assignment/app');
// webmaker(app);

// var hello = require('./hello');
// hello(app);



// var serverSide = require('./assignment/app');
// serverSide(app);

require("./assignment/app")(app);

// var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev');

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen( port , function() {
  console.log('Running on port ', app.get('port'))});
