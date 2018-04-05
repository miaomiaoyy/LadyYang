var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/admin");

var cakeSchema = new mongoose.Schema({
    name: String,
    color: String,
    layer: Number,
    description: String
});

var Cake = new mongoose.model("Cake", cakeSchema);

var mylove = new Cake({
    name: "My Heart will go on",
    color: "Red",
    layer: 1,
    description: "Heart cake while and red rose"
});

mylove.save(function (err, cake) {
    if(err) {
        console.log("error");
    } else {
        console.log("create a cake")
        console.log(cake)
    }
});

Cake.create({
    name: "Pikachu",
    color: "Yellow",
    layer: 1,
    description: "Pikachu Cake"
}, function (err, cake) {
    if(err) {
        console.log("error");
    } else {
        console.log("create a cake")
        console.log(cake)
    }
    }
);