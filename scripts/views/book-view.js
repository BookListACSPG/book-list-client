'use strict';

var app = app || {};

(function(module) {

  let bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(books => $('#book-list').append(books.toHtml()));
  }


model.bookView = bookView;

})(app);