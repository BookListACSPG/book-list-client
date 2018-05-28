'use strict';

var app = app || {};

(function(module) {

function Book (bookObject) {
  this.author = bookObject.author;
  this.title = bookObject.title;
  this.isbn = bookObject.isbn;
  this.image_url = bookObject.imageUrl;
  this.description = bookObject.description;

  Object.keys(bookObject).forEach(keys => {
    this[keys] = bookObject[keys];
  }, this);
};

Book.all = [];

Book.prototype.toHtml = function () {
  var template = Handlebars.compile($('#book-list-template').text());
  return template(this);
};

//STATIC METHOD: Static method calls are made directly on the class and are not callable on instances of the class.
Book.loadAll = (rows) => {
  Book.all = rows.sort((a, b) => b.title - a.title).map(rows => new Book(rows));
}

Book.fetchAll = function (callback) {
  $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
    .then(Book.loadAll)
    .then(callback)
    .catch(app.errorView.errorCallback)
  }

  Book.createBook = book => {
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/books`, book)
    .then(() => page('/'))
    .catch(app.errorView.errorCallback);
  }
  
  Book.updateBook = book => {
    $.put(`${app.ENVIRONMENT.apiUrl}/api/v1/books`, book)
    .then(() => page('/'))
    .catch(app.errorView.errorCallback);
  }
  
  Book.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/api/v1/books${this.book_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        title: this.title,
        isbn: this.isbn,
        image_url: this.imageUrl,
        description: this.description
      }
    })
      .then(console.log)
      .then(callback);
    };

  Book.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/apt/v1/books${this.article_id}`,
      method: 'DELETE'
    })
    .then(console.log)
    .then(callback);
  };

  Book.fetchOne = (ctx, next) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/${ctx.params.book_id}`)
    .then(next)
  }

  



module.Book = Book;

})(app);