'use strict';

var app = app || {};

(function(module) {

  const bookView = {};

  bookView.initIndexPage = () => {
    module.showOnly('.book-view');
    // $('.container').hide();
    // $('.book-view').show();
    module.Book.all.map(books => $('#book-list').append(books.toHtml()));
  }

module.bookView = bookView;

})(app);

$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});
