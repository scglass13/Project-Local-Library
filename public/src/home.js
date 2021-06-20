function getTotalBooksCount(books) {
  let count = 0;
  for (let book in books) {
    count += 1;
  }
  return count;
}

function getTotalAccountsCount(accounts) {
  let count = 0;
  for (let account in accounts) {
    count += 1;
  }
  return count;
}

function getBooksBorrowedCount(books = []) {
  let total = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) total++;
  });
  return total;
}

function getMostCommonGenres(books = []) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  bookGenres.map((genre) => {
    const genreLocation = temp.findIndex((element) => element.name === genre);
    genreLocation >= 0
      ? (temp[genreLocation].count = temp[genreLocation].count + 1)
      : temp.push({ name: genre, count: 1 });
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

function getTopFive(result) {
  result.sort((a, b) => b.count - a.count);
  if (result.length > 5) {
    return result.slice(0, 5);
  }
}

function getMostPopularBooks(books = []) {
  let result = [];
  books.forEach((book) =>
    result.push({ name: book.title, count: book.borrows.length })
  );

  //   limit to top 5 books
  const topFive = getTopFive(result);
  return topFive;
}

function getMostPopularAuthors(books = [], authors = []) {
  let result = [];
  books.forEach((book) => {
    let bookAuthorID = book.authorId;
    authors.filter((author) => {
      if (author.id === bookAuthorID && !result.includes(author.name)) {
        let count = book.borrows.length;
        result.push({
          name: author.name.first + " " + author.name.last,
          count: count,
        });
      } else {
        let count = book.borrows.length;
      }
    });
  });
  //   limit to top 5 authors
  const topFive = getTopFive(result);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
