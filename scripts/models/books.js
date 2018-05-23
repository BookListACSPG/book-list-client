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
console.log(Book.all);

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
  // $.get('http://localhost:3000/api/v1/books')
  $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
  // $.get('https://www.googleapis.com/books/v1/volumes')
    .then(Book.loadAll)
    .then(callback)
    .catch(app.errorView.errorCallback)
  }


module.Book = Book;

})(app);