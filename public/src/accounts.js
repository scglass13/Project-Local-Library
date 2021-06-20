function findAccountById(accounts, id) {
  for (let index of accounts) {
    if (index.id === id) return index;
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account.id;
  let total = 0;
  books.forEach((book) =>
    book.borrows.reduce((accumulator, borrow) => accId === borrow.id && total++)
  );
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksTaken = [];
  books.forEach((book) => {
    if (book.borrows.find((item) => item.id === account.id && !item.returned)) {
      booksTaken.push(book);
    }
  });
  booksTaken.forEach((book) => {
    let anAuthor = authors.find((person) => person.id === book.authorId);
    book["author"] = anAuthor;
  });
  return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
