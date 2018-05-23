'use strict';

var app = app || {};

(function(module) {

function Book (bookObject) {
  // this.author = bookObject.author;
  // this.title = bookObject.title;
  // this.isbn = bookObject.isbn;
  // this.image_url = bookObject.imageUrl;
  // this.description = bookObject.description;

  Object.keys(bookObject).forEach(keys => {
    this[keys] = bookObject[keys];
  }, this);
};

Book.all = [];

Book.prototype.toHtml = function () {
  //Incomplete code line 23
  // return app.render('book-list-template', this)
  var template = Handlebars.compile($('#book-list-template').text());

  return template(this);
};

//STATIC METHOD: Static method calls are made directly on the class and are not callable on instances of the class.
Book.loadAll = (rows) => {
  Book.all = rows.sort((a, b) => b.title - a.title).map(rows => new Book(rows));
  console.log(rows.sort((a, b) => b.title - a.title).map(rows => new Book(rows)));
}

Book.fetchAll = function (callback) {
  $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
    .then(Book.loadAll)
    .then(callback)
    .catch(app.errorView.errorCallback)
  }

  Book.createBook = book => {
    $.post(`${app.ENVIRONMENT.apiUrl}/book/add`, book)
    .then(() => page('/'))
    .catch(app.errorView.errorCallback);
  }

  Book.fetchOne = (ctx, next) => {
    console.log(ctx);
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/${book_id}`)
    .then($('.book-item').hide())
    .then($(`.book-item[data-book-id="${ctx.params.book_id}"]`).show())
    .then(next)
  }

  



module.Book = Book;

})(app);