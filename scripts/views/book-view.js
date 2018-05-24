'use strict';

var app = app || {};

(function(module) {

  const bookView = {};

  bookView.initIndexPage = () => {
    $('#book-list').empty();
    $('#details').empty();

    app.showOnly('.book-view');
    module.Book.all.map(books => $('#book-list').append(books.toHtml()));
    console.log('this initIndexPage is being logged')
  }

  bookView.initAddBook = function () {
    $('#book-list').empty();
    $('#details').empty();

    app.showOnly('.new-book');

    $('#add-form').on('submit', function(event) {
      event.preventDefault();
      console.log('This hit the form submit button');

      let bookFormData = new Book ({
        author: $('#book-author').val(),
        title: $('#book-title').val(),
        imageUrl: $('#book-image-url').val(),
        isbn: $('#book-isbn').val(),
        description: $('#book-description').val(),
      });
      console.log(bookFormData);
      
      //WHERE IS OUR CREATEBOOK METHOD?
      module.Book.createBook(bookFormData);
    })
  };

  bookView.initDetailPage = function (ctx) {
    $('#book-list').empty();
    $('#details').empty();

    console.log(ctx);

    app.showOnly('#details');

    $('#details').append(app.render('book-detail-template', ctx[0]));
  }

module.bookView = bookView;

})(app);

$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});
