'use strict';

$(function () {
  $('.nav').hide();
  $('#menu').on('click', function (event) {
    $('.nav').toggle();
});
});

var app = app || {};

(function(module) {

  function menuReset () {
    $('.nav').hide();
  }

  const bookView = {};

  bookView.initIndexPage = () => {
    menuReset();

    $('#book-list').empty();
    $('#details').empty();

    app.showOnly('.book-view');
    module.Book.all.map(books => $('#book-list').append(books.toHtml()));
  }

  bookView.initAddBook = function () {
    menuReset();

    $('#book-list').empty();
    $('#details').empty();

    app.showOnly('.new-book');

    $('#new-book-form').on('submit', function(event) {
      event.preventDefault();
      console.log('This hit the form submit button');

      let bookFormData = new app.Book ({
        author: $('#book-author').val(),
        title: $('#book-title').val(),
        imageUrl: $('#book-image-url').val(),
        isbn: $('#book-isbn').val(),
        description: $('#book-description').val(),
      });
      console.log(bookFormData);
      
      app.Book.createBook(bookFormData);
    })
  };

  bookView.initDetailPage = function (ctx) {
    menuReset();

    $('#book-list').empty();
    $('#details').empty();
    app.showOnly('#details');
    console.log(`This is the context of the object: `);
    console.log(ctx);
    
    $('#details').append(app.render('book-detail-template', ctx[0]));

    $('#book-delete').on('click', function() {
      console.log('THIS WILL PERMANENTLY DELETE THIS RECORD');
      //Why is "this" undefined?
      // console.log(ctx[book_id]);
      app.Book.deleteBook(ctx);
    });

  }

  // bookView.deleteBookDetail = function (id) {
  //   menuReset();

  // }


module.bookView = bookView;

})(app);

$(document).ready(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
});


