const bookshelf = document.getElementById("bookshelf");

books.forEach((book, index) => {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.textContent = book.title;

  bookDiv.addEventListener("click", () => {
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookYear").textContent = book.year;
    document.getElementById("bookGenre").textContent = book.genre;
    document.getElementById("bookDesc").textContent = book.description;
    document.getElementById("infoPanel").style.display = "block";
  });

  bookshelf.appendChild(bookDiv);
});

function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}

