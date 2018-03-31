
module.exports = function (app, model) {
    const multer = require('multer'); // npm install multer --save
    const upload = multer({ dest: __dirname + '/../../public/uploads' });

    app.post ('/api/upload', upload.single('myFile'), uploadImage);

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', getWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    var widgets = [
      // user 456, website 456, page 321
      {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2,
        'text': 'HelloKitty', 'width': '100%', 'url': ''},
      {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4,
        'text': 'Cest La Ve', 'width': '70%', 'url': ''},
      {
        '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'size': 2,
        'text': 'HILLO dfafa', 'width': '100%',
        'url': 'http://lorempixel.com/400/200/'
      },
      {'_id': '456', 'widgetType': 'HTML', 'pageId': '654', 'size': 2,
        'text': 'Cest La Ve', 'width': '100%', 'url': ''},
      {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321',
        'size': 4, 'text': 'WestLife', 'width': '100%', 'url': ''},
      {
        '_id': '234', 'widgetType': 'YOUTUBE', 'pageId': '654', 'size': 2, 'text': 'HILLO Kitty', 'width': '100%',
        'url': 'https://www.youtube.com/embed/aFuA50H9uek'
      },
      {'_id': '345', 'widgetType': 'HTML', 'pageId': '321', 'size': 2,
        'text': 'WestLife', 'width': '100%', 'url': ''},
      {
        '_id': '456', 'widgetType': 'IMAGE', 'pageId': '654', 'size': 2, 'text': 'HILLO yeye', 'width': '100%',
        'url': 'http://lorempixel.com/400/200/'
      },
      {'_id': '444', 'widgetType': 'HTML', 'pageId': '654', 'size': 2,
        'text': 'HILLO WIWO', 'width': '100%', 'url': ''},
      {'_id': '555', 'widgetType': 'HEADING', 'pageId': '654', 'size': 4,
        'text': 'WEB DEV', 'width': '100%', 'url': ''},
      {
        '_id': '666', 'widgetType': 'YOUTUBE', 'pageId': '654',
        'size': 2, 'width': '100%', 'text': 'hshsd',
        'url': 'https://www.youtube.com/embed/k2qgadSvNyU'
      }];

    function uploadImage(req, res) {

      var widgetId      = req.body.widgetId;
      var width         = req.body.width;
      var myFile        = req.file;
      var userId = req.body.userId;
      var websiteId = req.body.websiteId;
      var pageId = req.body.pageId;

      var originalname  = myFile.originalname; // file name on user's computer
      var filename      = myFile.filename;     // new file name in upload folder
      var path          = myFile.path;         // full path of uploaded file
      var destination   = myFile.destination;  // folder where file is saved to
      var size          = myFile.size;
      var mimetype      = myFile.mimetype;
      var callbackUrl   = 'http://localhost:4200/profile/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/';

      res.redirect(callbackUrl);
    }

  // function createWidget(req, res) {
  //   console.log('create widget @  ' + req.body);
  //   var widget = req.body;
  //   widget._id = '123' + getRandomString();
  //   widgets.push(widget);
  //   res.json(widget);
  // }

  function reSortWidget(req,res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query["initial"]);
    var endIndex = parseInt(req.query["final"]);
    model.WidgetModel.reorderWidget(pageId, startIndex, endIndex)
      .then(
        function (page) {
          res.sendStatus(200);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      )
  }

  function createWidget(req, res) {
    console.log('create widget @  ' + req.body);
    var widget = req.body;
    var pageId = req.param['pid'];
    model.WidgetModel.createWidget(pageId, widget)
      .then(function (newWidget){
        if(newWidget) {
          model.WidgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
              pageId.widgets.push(newWidget);
            })
        } else {
          res.status(404).send("Create widget error");
        }
    });
    res.json(widgets);
  }



  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pid'];
    model.WidgetModel.findAllWidgetsForPage(pageId).then( function (widget) {
      if(widget) {
        res.json(widget);
      }else {
        res.status(404).send("Can't find target widget");
      }
    })
  }



  function getWidgetById(req, res) {
    var widgetId = req.params["wgid"];
    model.WidgetModel.findWidgetById(widgetId).then(function (widget) {
      if (widget) {
        res.status(200).send(widget);
      } else {
        res.status(404).send("Can't find target widget");
      }
    });
  }

  function updateWidget(req, res) {
    var widgetId = req.params['wgid'];
    var widget = req.body;
    model.WidgetModel.updateWidget(widgetId, widget).then(function (widget) {
        if (widget) {
          res.status(200).send(widget);
        } else {
          res.status(404).send('Update error');
        }
      }
    )
  }

  // function updateWidget(req, res) {
  //   var widgetId = req.params['widgetId'];
  //   var widget = req.body;
  //   for ( const i in widgets ) {
  //     if ( widgets[i]._id === widgetId ) {
  //       switch (widget.widgetType) {
  //         case 'HEADER':
  //           widgets[i].text = widget.text;
  //           widgets[i].size = widget.size;
  //           res.json(widget);
  //           return;
  //
  //         case 'IMAGE':
  //           widgets[i].text = widget.text;
  //           widgets[i].url = widget.url;
  //           widgets[i].width = widget.width;
  //           res.json(widget);
  //           return;
  //
  //         case 'YOUTUBE':
  //           widgets[i].text = widget.text;
  //           widgets[i].url = widget.url;
  //           widgets[i].width = widget.width;
  //           res.json(widget);
  //           return;
  //       }
  //     }
  //   }
  //   res.status(404).send('Not Found');
  // }
  //
  // function deleteWidget(req, res) {
  //   var widgetId = req.params['widgetId'];
  //   widgets.splice(widgets.findIndex(function (widget) {
  //     return widget._id === widgetId;
  //   }), 1);
  //   res.json({});
  // }


  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // find widget by id
    if (widgetId === undefined) {
      var widget = {_id: undefined, type: 'IMAGE', pageId: pageId,size: size,text: 'text', width:'100%',
        url:'/uploads/'+filename};
      model.WidgetModel.createWidget(pageId, widget)
    } else {
      var widget = { url: '/uploads/'+filename };
      model.WidgetModel
        .updateWidget(widgetId, widget)
        .then(function (stats) {
            res.send(200);
          },
          function (err) {
            res.sendStatus(404).send(err);
          });
    }
    var callbackUrl   = "/user/"+ userId+ "/website/" + websiteId + "/page/" + pageId+ "/widget";
    res.redirect(callbackUrl);
  }

    function deleteWidget(req, res) {
    var widgetId = req.params['wgid'];
    var pageId = req.param['pid'];
    model.WidgetModel.deleteWidget(widgetId)
      .then(function(deleteWidget){
      model.WidgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
          pageId.widgets.remove(deleteWidget)
        });
    });
  }

};



