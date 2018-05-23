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

  bookView.initAddBook = function () {
    app.showOnly('.add-view');

    $('#add-form').on('submit', function(event) {
      event.preventDefault();

      let bookFormData = new Book ({
        author: $('#book-author').val(),
        title: $('#book-title').val(),
        imageUrl: $('#book-image-url').val(),
        isbn: $('#book-isbn').val(),
        description: $('#book-description').val(),
      });

      //WHERE IS OUR CREATEBOOK METHOD?
      module.Book.createBook(bookFormData);
    })
  };

module.bookView = bookView;

})(app);

$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});
