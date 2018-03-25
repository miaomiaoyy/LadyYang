var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var cakes = [
    {name: "My hear will go on", image:"https://i.ytimg.com/vi/uyXHUJVFNmc/maxresdefault.jpg"},
    {name: "Nutella Chocolate ", image:"https://www.lifeloveandsugar.com/wp-content/uploads/2014/11/Chocolate_Nutella_Cake3.jpg"},
    {name: "Purple Dream", image:"https://photo.foodgawker.com/wp-content/uploads/2015/10/2432955.jpg"},
    {name: "Alice's Wonderland", image:"http://cdn.shopify.com/s/files/1/0642/6881/products/BlueCakeClass_600x450_baff755e-a5e1-4b83-b3e3-079bc9a9aba3_600x.jpg?v=1494867890"}
]
app.get("/", function (req, res) {
    res.render("landing");
});


app.get("/cakes", function (req, res) {

    res.render("cakes", {cakes : cakes});

});

// app.get("*", function (req, res) {
//     res.render("landing");
// });

app.post("/cakes", function (req, res) {
   // res.send("Hit the route");
    var name =  req.body.name;
    var image = req.body.image;
    var newCake = {name: name, image : image};
    cakes.push(newCake);
    res.redirect("/cakes");
});

app.get("/cakes/new", function (req,res) {
    res.render("new.ejs");
});

const port=process.env.PORT || '3109';
app.set('port', port);

// app.listen(process.env.PORT, function () {
//     console.log("I love cake");
// });


app.listen( port , function() {
    console.log('I love cake! Node app is running on port', app.get('port'))});