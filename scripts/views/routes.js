'use strict'

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add', ctx => app.bookView.initAddBook(ctx));
page('/books/:book_id', (ctx, next) => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
// page('/books/:book_id/delete', (ctx, next) => app.bookView.deleteBookDetail(ctx, app.Book.deleteBook));
page();