'use strict';

var app = app || {};

(function(module) {

function Book (bookObject) {

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

  Book.fetchOne = (ctx, next) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/${ctx.params.book_id}`)
    .then(next)
  }

  Book.deleteBook = (id) => {
    console.log(id);
    console.log('This deleteBook method is being hit');
    $.ajax({
      url: `${app.ENVIRONMENT.apiUrl}/api/v1/books/${id}`,
      method: 'DELETE',
    })
    .then(console.log(id))
    .then(() => page('/'))
    .catch(app.errorView.errorCallback);
  }


module.Book = Book;

})(app);