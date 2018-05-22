'use strict';

var app = app || {};

(function(module) {

function Book (bookObject) {
  // this.author = bookObject.author;
  // this.title = bookObject.title;
  // this.isbn = bookObject.isbn;
  // this.image_url = bookObject.imageUrl;
  // this.description = bookObject.description;

  Object.key(bookObject).forEach(key => {
    this[key] = bookObject[key];
  }, this);
};

Book.all = [];

Book.prototype.toHtml = function () {
  var template = Handlebars.compile($('#book-list-template').text());

  return template(this);
};

//STATIC METHOD: Static method calls are made directly on the class and are not callable on instances of the class.
Book.loadAll = function (rows) {
  Book.all = rows.sort((a, b) => a.title - b.title).map(rows => new Book(rows));
}

Book.fetchAll = function (callback) {
  $.get('/api/v1/books')
    .then(Book.loadAll)
    .then(callback)
    .error(app.errorView.errorCallback)
  }











module.Book = Book;

})(app);