function findAuthorById(authors, id) {
  for (let index of authors) {
    if (index.id === id) return index;
  }
}

function findBookById(books, id) {
  for (let index of books) {
    if (index.id === id) return index;
  }
}

function partitionBooksByBorrowedStatus(books = []) {
  let borrowed = [];
  books.map((book) => {
    if (book.borrows[0].returned === false) {
      borrowed.push(book);
    }
  });

  let returned = [];
  books.map((book) => {
    if (book.borrows[0].returned === true) {
      returned.push(book);
    }
  });

  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map(({ id, returned }) => {
    // find account that matches the borrower's ID
    const account = accounts.find((account) => account.id === id);
    // return the matching account, along with the `returned` info
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
