'use strict';

var app = app || {};

(function (module) {

let errorView = {};

errorView.initErrorPage = () => {
  $('.container').hide();
  $('.error-view').show();
  $('error-message').empty();

  // var template = Handlebars.compile($('#error-template').text());

  $('#error-message').append(app.render('error-template', err));
}

//does this need to be a method of errorView? Also, should this be inside or outside the IIFE?
errorView.errorCallback = (errorObject) => {
  console.error(errorView.initErrorPage);
}

module.errorView = errorView;

})(app);
