// var mongoose = require("mongoose");
//
// var PageSchema = require("../page/page.schema.server");
// var WidgetSchema = require("./widget.schema.server");
// var PageModel = mongoose.model("PageModule", PageSchema);
// var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
//
// WidgetModel.createWidget = createWidget;
// WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
// WidgetModel.findWidgetById = findWidgetById;
// WidgetModel.updateWidget = updateWidget;
// WidgetModel.deleteWidget = deleteWidget;
// WidgetModel.reorderWidget = reorderWidget;
//
// module.exports = WidgetModel;
//
// function createWidget(pageId, Widget) {
//
//   return WidgetModel.create(Widget)
//     .then(function(responseWidget){
//       PageModel.findPageById(responseWidget.pageId)
//         .then(function(page){
//           page.widgets.push(responseWidget);
//           return page.save();
//         })
//       return responseWidget;
//     });
// }
//
// function findAllWidgetsForPage(pageId) {
//   // return WidgetModel.find({'pageId' : pageId})
//   //   .populate('pageId').exec();
//   return PageModel
//     .findPageById(pageId)
//     .populate('widgets')
//     .then(
//       function (page) {
//         // console.log(page.widgets);
//         return page.widgets;
//       }
//     )
// }
//
// function findWidgetById(widgetId) {
//   return WidgetModel.findWidgetById(widgetId);
// }
//
// function updateWidget(widgetId, widget){
//   return WidgetModel.update({_id: widgetId}, widget);
// }
//
// function deleteWidget(widgetId) {
//    widget = WidgetModel.findWidgetById(widgetId).then(function(widget) {
//     PageModel.findPageById(widget.pageId).then(function(page){
//       page.widgets.remove({_id: widgetId});
//       page.save();
//     })
//   });
//   return WidgetModel.remove({_id: widgetId});
// }
//
// function reorderWidget(pageId, start, end) {
//   return PageModel.findPageById(pageId).then(
//     function(page) {
//       page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
//       return page.save();
//     }
//   )
// }


module.exports = function () {
  var model = {};
  var mongoose = require("mongoose");
  var WidgetSchema = require("./widget.schema.server");
  var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

  var api = {
    createWidget: createWidget,
    findAllWidgetsForPage: findAllWidgetsForPage,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    reorderWidget: reorderWidget,
    setModel: setModel
  };
  return api;

  function setModel(_model) {
    model = _model;
  }


  function reorderWidget(pageId, start, end) {

  }


  function deleteWidget(widgetId) {
    return WidgetModel.remove({_id: widgetId});
  }

  function updateWidget(widgetId, widget) {
    return WidgetModel
      .update(
        {
          _id: widgetId
        },
        {
          _page: widget._page,
          type: widget.type,
          name: widget.name,
          text: widget.text,
          placeholder: widget.placeholder,
          description: widget.description,
          width: widget.width,
          url : widget.url,
          height: widget.height,
          rows: widget.rows,
          size: widget.size,
          class: widget.class,
          icon: widget.icon,
          deletable: widget.deletable,
          formatted: widget.formatted,
          dateCreated: widget.dateCreated
        }
      );
  }

  function findWidgetById(widgetId) {
    return WidgetModel.findById(widgetId);
  }

  function findAllWidgetsForPage(pageId) {
    return WidgetModel.find(
      {"_page" : pageId}
    );
  }


  function createWidget(pageId, widget) {

    return WidgetModel
      .create(widget)
      .then(function (widgetObj) {
        return model.PageModel
          .findPageById(pageId)
          .then(function (pageObj) {
            pageObj.widgets.push(widgetObj);
            widgetObj._page = pageObj._id;
            widgetObj.save();
            return pageObj.save();
          })
      })
  }

};
