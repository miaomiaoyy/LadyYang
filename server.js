
// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Api CALLS*/
app.get('/api/user/', function (req,res) {
    res.send();
})

app.get('/api/user/:userId', function (req,res) {
  res.send();
})

app.post('/api/user/', function (req,res) {
  res.send();
})


app.post('/api/user/:userId', function (req,res) {
  res.send();
})


app.delete('/api/user/:userId', function (req,res) {
  res.send();
})

app.put('/api/user/:userId', function (req,res) {
  res.send();
})


var webmaker = require('./assignment/app');
webmaker(app);



// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));



// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});




const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

//var serverSide = require("./server/test-mongodb/app");
//serverSide(app);



// // For Build: Catch all other routes and return the index file -- BUILDING
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'assets/index.html'));
// });


server.listen( port , () => console.log('Running'));

