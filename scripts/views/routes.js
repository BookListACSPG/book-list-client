'use strict'

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/add', ctx => app.bookView.initAddForm(ctx));
page('/books/:book_id', (ctx, next) => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page();