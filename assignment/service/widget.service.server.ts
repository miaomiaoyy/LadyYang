import {getRandomString} from 'selenium-webdriver/safari';

module.exports = function (app) {
    const multer = require('multer'); // npm install multer --save
    const upload = multer({ dest: __dirname + '/../../public/uploads' });

    app.post ('/api/upload', upload.single('myFile'), uploadImage);

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', getWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    const widgets = [
      // user 456, website 456, page 321
      {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'HelloKitty'},
      {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Cest La Ve'},
      {
        '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'size': 2, 'width': '100%',
        'url': 'http://lorempixel.com/400/200/'
      },
      {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'size': 2, 'text': 'Cest La Ve'},
      {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'WestLife'},
      {
        '_id': '234', 'widgetType': 'YOUTUBE', 'pageId': '321', 'size': 2, 'width': '100%',
        'url': 'https://www.youtube.com/embed/aFuA50H9uek'
      },
      {'_id': '345', 'widgetType': 'HTML', 'pageId': '321', 'size': 2, 'text': 'WestLife'},
      {
        '_id': '456', 'widgetType': 'IMAGE', 'pageId': '654', 'size': 2, 'width': '100%',
        'url': 'https://cdn.pixabay.com/photo/2016/02/17/15/37/laptop-1205256_1280.jpg'
      },
      {'_id': '444', 'widgetType': 'HTML', 'pageId': '654', 'size': 2, 'text': 'HILLO WIWO'},
      {'_id': '555', 'widgetType': 'HEADING', 'pageId': '654', 'size': 4, 'text': 'WEB DEV'},
      {
        '_id': '666', 'widgetType': 'YOUTUBE', 'pageId': '654', 'size': 2, 'width': '100%',
        'url': 'https://www.youtube.com/embed/k2qgadSvNyU'
      },
      {'_id': '777', 'widgetType': 'HTML', 'pageId': '654', 'size': 2, 'text': 'mamami'}
    ];

    function uploadImage(req, res) {

      const widgetId      = req.body.widgetId;
      const width         = req.body.width;
      const myFile        = req.file;

      const userId = req.body.userId;
      const websiteId = req.body.websiteId;
      const pageId = req.body.pageId;

      const originalname  = myFile.originalname; // file name on user's computer
      const filename      = myFile.filename;     // new file name in upload folder
      const path          = myFile.path;         // full path of uploaded file
      const destination   = myFile.destination;  // folder where file is saved to
      const size          = myFile.size;
      const mimetype      = myFile.mimetype;

      for (const i in widgets) {
        if (widgets[i]._id === widgetId) {
          widgets[i].url = '/uploads/' + filename;
          // res.json(widgets[i]);
          break;
        }
      }
      const callbackUrl   = 'http://localhost:4200/profile/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/';

      res.redirect(callbackUrl);
    }

  function createWidget(req, res) {
    const widget = req.body;
    widget._id = '123' + getRandomString();
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params['pageId'];
    const widgetsByPageId = widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
    res.json(widgetsByPageId);
  }

  function getWidgetById(req, res) {
    const widgetId = req.params['widgetId'];
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        res.json(widgets[i]);
        return;
      }
    }
  }

  function updateWidget(req, res) {
    const widgetId = req.params['widgetId'];
    const widget = req.body;
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        widgets[i].widgetType = widget.widgetType;
        widgets[i].pageId = widget.pageId;
        widgets[i].size = widget.size;
        widgets[i].text = widget.text;
        widgets[i].width = widget.width;
        widgets[i].url = widget.url;
        res.json(widgets[i]);
        return;
      }
    }
  }

  function deleteWidget(req, res) {
    const widgetId = req.params['widgetId'];
    widgets.splice(widgets.findIndex(function (widget) {
      return widget._id === widgetId;
    }), 1);
    res.json({});
  }
};
