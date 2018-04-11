

module.exports = function (app) {


  app.post("/cakes", showCakes);

  function showCakes(req, res) {
    webdev.find({}, function (err, cake) {
      if (err) {
        console.log("error");
      } else {
        console.log("Pika");
        res.render("cakes", {cakes: cake});
      }
    });
  });
}
