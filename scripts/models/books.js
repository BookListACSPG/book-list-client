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

Book.prototype.loadAll = function () {
  
}

module.Book = Book;

})(app);