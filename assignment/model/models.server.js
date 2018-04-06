var mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connect('mongodb://yang:224@ds217349.mlab.com:17349/heroku_93x3fp0h');

module.exports = db;



