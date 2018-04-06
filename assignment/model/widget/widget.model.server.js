var mongoose = require("mongoose");
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return widgetModel.create(widget)
    .then(function (newWidget) {
      pageModel.addWidget(pageId, newWidget._id);
      return newWidget._id;
    });
}

function findAllWidgetsForPage(pageId) {
  return pageModel.findPageById(pageId)
    .populate('widgets')
    .then(function (page) {
      return page.widgets;
    });
  // return widgetModel.find({_page: pageId});

}

function findWidgetById(widgetId) {
  return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return widgetModel.update(
    {
      _id: widgetId
    },
    {
      name: widget.name,
      text: widget.text,
      placeholder: widget.placeholder,
      description: widget.description,
      url: widget.url,
      width: widget.width,
      size: widget.size,
      rows: widget.rows,
      formatted: widget.formatted
    }
  );
}

function deleteWidget(widgetId) {
  return widgetModel.findOne({_id: widgetId})
    .then(function (widget) {
      var pageId = widget._page;
      widgetModel.remove({_id: widgetId})
        .then(function () {
          return pageModel.deleteWidget(pageId, widgetId);
        })
    })
}


// function deleteWidget(pageId, widgetId) {
//   console.log('database pageId: ' + pageId);
//   console.log('database widgetId ' + widgetId);
//   return widgetModel
//     .remove({_id: widgetId})
//     .then(function () {
//       return pageModel
//         .deleteWidget(pageId, widgetId);
//     });
// }


function reorderWidget(pageId, startIndex, endIndex) {
  return pageModel.findPageById(pageId)
    .then(function (page) {
      var startWidgetId = page.widgets[startIndex];
      return pageModel.reorderWidget(pageId, startWidgetId, endIndex);
    });
}
