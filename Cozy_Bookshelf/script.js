// Render all books on the shelf
function renderShelf() {
  const bookshelf = document.getElementById("bookshelf");
  bookshelf.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.textContent = book.title;

    bookDiv.addEventListener("click", function () {
      showBookDetails(book);
      showBookInTable(book);
    });

    bookshelf.appendChild(bookDiv);
  }

  console.log("Shelf rendered with " + books.length + " books.");
}

// Show book info in the side panel
function showBookDetails(book) {
  document.getElementById("bookTitle").textContent = book.title;
  document.getElementById("bookAuthor").textContent = book.author;
  document.getElementById("bookYear").textContent = book.year;
  document.getElementById("bookGenre").textContent = book.genre;
  document.getElementById("bookDesc").textContent = book.description;
  document.getElementById("infoPanel").style.display = "block";
}

// Show selected book in the table
function showBookInTable(book) {
  const tableBody = document.querySelector("#bookTable tbody");
  tableBody.innerHTML = "";

  const row = document.createElement("tr");
  row.innerHTML =
    "<td>" + book.title + "</td>" +
    "<td>" + book.author + "</td>" +
    "<td>" + book.year + "</td>" +
    "<td>" + book.genre + "</td>";

  tableBody.appendChild(row);

  document.querySelector(".table-wrapper").style.display = "block";
  document.getElementById("lastViewed").textContent = book.title;
}

// Hide book info panel
function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}

// Add a book
document.getElementById("addForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("addTitle").value.trim();
  const author = document.getElementById("addAuthor").value.trim();
  const year = parseInt(document.getElementById("addYear").value);
  const genre = document.getElementById("addGenre").value.trim();
  const description = document.getElementById("addDesc").value.trim();

  if (!title || !author || !genre || !description || isNaN(year)) {
    showError("All fields are required and year must be a number.");
    return;
  }

  let exists = false;
  for (let i = 0; i < books.length; i++) {
    if (books[i].title.toLowerCase() === title.toLowerCase()) {
      exists = true;
    }
  }

  if (exists) {
    showError("A book with this title already exists.");
    return;
  }

  const newBook = {
    title: title,
    author: author,
    year: year,
    genre: genre,
    description: description
  };

  books.push(newBook);
  saveBooks();
  renderShelf();
  updateBookStats();
  this.reset();
  document.querySelector("#bookTable tbody").innerHTML = "";

  console.log("New book added: " + title);
});

// Remove a book
document.getElementById("removeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("removeTitle").value.trim();
  const oldLength = books.length;

  let newBooks = [];

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.toLowerCase() !== title.toLowerCase()) {
      newBooks.push(books[i]);
    }
  }

  if (newBooks.length === oldLength) {
    showError("Book not found.");
    return;
  }

  books = newBooks;
  saveBooks();
  renderShelf();
  updateBookStats();
  this.reset();
  document.querySelector("#bookTable tbody").innerHTML = "";

  console.log("Book removed: " + title);
});

// Update a book
document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("updateTitle").value.trim();
  const newAuthor = document.getElementById("newAuthor").value.trim();
  const newYear = parseInt(document.getElementById("newYear").value);
  const newGenre = document.getElementById("newGenre").value.trim();

  if (!title || !newAuthor || !newGenre || isNaN(newYear)) {
    showError("Please fill in all fields and make sure year is a number.");
    return;
  }

  let updated = false;

  for (let i = 0; i < books.length; i++) {
    if (books[i].title.toLowerCase() === title.toLowerCase()) {
      books[i].author = newAuthor;
      books[i].year = newYear;
      books[i].genre = newGenre;
      updated = true;
    }
  }

  if (!updated) {
    showError("Book not found.");
    return;
  }

  saveBooks();
  renderShelf();
  updateBookStats();
  this.reset();
  document.querySelector("#bookTable tbody").innerHTML = "";

  showError("");
  console.log("Book updated: " + title);
});

// Update book/genre count
function updateBookStats() {
  document.getElementById("bookCount").textContent = books.length;

  let genres = [];

  for (let i = 0; i < books.length; i++) {
    if (!genres.includes(books[i].genre)) {
      genres.push(books[i].genre);
    }
  }

  document.getElementById("genreCount").textContent = genres.length;
}

// Show error messages
function showError(message) {
  document.getElementById("error").textContent = message;
}

// Save books to local storage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Load everything when page opens
window.onload = function () {
  renderShelf();
  updateBookStats();
  document.querySelector("#bookTable tbody").innerHTML = "";

  console.log("Page loaded. Total books: " + books.length);
};



