module.exports = function (app) {
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

  // var WIDGETS = [
  //   {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO", "width": "10%", "url": "url"},
  //   {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "width": "100%", "url": "url"},
  //   {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "size": "1", "text": "text", "width": "100%", "url": "http://lorempixel.com/400/200/"},
  //   {"_id": "456", "widgetType": "HTML", "pageId": "321", "size": "1", "text": "HTML Lorem ipsum", "width": "100%", "url": "url"},
  //   {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "width": "100%", "url": "url"},
  //   {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "size": "1", "text": "text", "width": "100%", "url": "https://www.youtube.com/embed/AM2Ivdi9c4E"},
  //   {"_id": "789", "widgetType": "HTML", "pageId": "321", "size": "1", "text": "Lorem ipsum", "width": "100%", "url": "url"}
  // ];

  var widgetModel = require('../model/widget/widget.model.server');

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);


  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widgetModel.createWidget(pageId, widget)
      .then(
        function () {
          res.sendStatus(200);
        }
      );
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];

    widgetModel.findAllWidgetsForPage(pageId)
      .then(
        function(widgets) {
          res.json(widgets);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel.findWidgetById(widgetId)
      .then(
        function (widget) {
          res.send(widget);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;

    widgetModel.updateWidget(widgetId, newWidget)
      .then(
        function (newWidget) {
          res.sendStatus(200);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel.deleteWidget(widgetId)
      .then(function (status) {
        res.send(status);
      });

    // var widgetId = req.params['widgetId'];
    // var pageId = req.params['pageId'];
    // console.log('server side widgetId ' + widgetId);
    // console.log('server side pageId ' + pageId);
    //
    // return widgetModel.deleteWidget(pageId, widgetId)
    //   .then(
    //     function (status) {
    //       res.sendStatus(200);
    //     },
    //     function (error) {
    //       res.sendStatus(400).send(error);
    //     }
    //   );
  }


  function reorderWidgets(req, res) {
    // var pageId = req.params['pageId'];
    // var index1 = req.query["start"];
    // var index2 = req.query["end"];
    //
    // var widgetForPage = WIDGETS.filter(function (w) {
    //   return parseInt(w.pageId) == parseInt(pageId);
    // });
    //
    // WIDGETS = WIDGETS.filter(function (w) {
    //   return parseInt(w.pageId) != parseInt(pageId);
    // });
    //
    // console.log(index1, index2);
    // var temp = widgetForPage[index1];
    // widgetForPage.splice(index1, 1);
    // widgetForPage.splice(index2, 0, temp);
    // WIDGETS.push.apply(WIDGETS, widgetForPage);
    //
    // res.send(WIDGETS);
    // return WIDGETS;

    var pageId = req.params['pageId'];
    var start = parseInt(req.query["start"]);
    var end = parseInt(req.query["end"]);

    return widgetModel.reorderWidget(pageId, start, end)
      .then(
        function(status) {
          res.sendStatus(200);
        },
        function(error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    if (myFile == null) {
      return "http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
      // return "https://hellokittyy.herokuapp.com//profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    }

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    // var widget = getWidgetById(widgetId);
    //
    // function getWidgetById(widgetId) {
    //   if (widgetId === undefined || widgetId === null || widgetId === '') {
    //     var newWidget = {
    //       _id: new Date().getTime() + '',
    //       widgetType: 'IMAGE',
    //       pageId: pageId,
    //       size: '1',
    //       text: 'text',
    //       width: width
    //     };
    //
    //     WIDGETS.push(newWidget);
    //     return newWidget;
    //   }
    //   for (w in WIDGETS) {
    //     if (parseInt(WIDGETS[w]._id) === parseInt(widgetId)) {
    //       return WIDGETS[w];
    //     }
    //   }
    // }

    var url = '/uploads/' + filename;
    console.log(filename);

    if (widgetId === undefined || widgetId === null || widgetId === '') {
      var widget = {
        widgetType: "IMAGE",
        _page: pageId,
        size: 1,
        text: 'text',
        width: width,
        url: url
      };

      widgetModel.createWidget(pageId, widget)
        .then(
          function (widget) {
            if (widget) {
              res.json(widget);
            } else {
              widget = null;
              res.send(widget);
            }
          },
          function (error) {
            res.sendStatus(400).send("widget service server, upload error");
          }
        )
    } else {
      widgetModel.findWidgetById(widgetId)
        .then(
          function (widget) {
            widget.url = url;
            widgetModel.updateWidget(widgetId, widget)
              .then(
                function (widget) {
                  res.json(widget);
                },
                function(error) {
                  res.status(400).send("widget service server, update widget error");
                }
              )
          },
          function (error) {
            res.status(400).send("Cannot find widget by id");
          }
        )
    }


    var callbackUrl = "http://localhost:4200/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    // var callbackUrl = "https://hellokittyy.herokuapp.com/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    res.redirect(callbackUrl);
  }

};
