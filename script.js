const addBookBtn = document.querySelector(".addBookBtn");
const libraryElem = document.querySelector(".library");
const addBookDialog = document.querySelector(".addBookDialog");
const closeDialog = document.querySelector(".closeBtn");
const submitBook = document.querySelector(".submitBtn");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookRead = document.querySelector("#bookRead");
addBookBtn.addEventListener("click", () => {
  addBookDialog.showModal();
});
closeDialog.addEventListener("click", () => {
  addBookDialog.close();
});

let bookLibrary = [];
submitBook.addEventListener("click", (event) => {
  event.preventDefault();
  const newBookTitle = bookTitle.value.trim();
  const newBookAuthor = bookAuthor.value.trim();
  const newBookRead = checkRead();
  const newBook = new Book(newBookTitle, newBookAuthor, newBookRead);
  if (isInLibrary(newBook)) {
    alert("Book Exist in your library");
  } else {
    bookLibrary.push(new Book(newBookTitle, newBookAuthor, newBookRead));
    addBookDialog.close();
    resetLibrary();
    updateLibrary();
  }
});
function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = Boolean(read);
}
Book.prototype.readToggle = function () {
  this.read = !this.read;
  return this.read;
};
function checkRead() {
  if (bookRead.value === "true") {
    return true;
  }
}
function resetLibrary() {
  libraryElem.innerHTML = "";
}
function updateLibrary() {
  for (const libraryBook of bookLibrary) {
    const book = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookReadBtn = document.createElement("button");
    const bookRemoveBtn = document.createElement("button");
    bookTitle.classList.add("bookCardTitle");
    bookAuthor.classList.add("bookCardAuthor");
    bookRemoveBtn.textContent = "Remove";
    bookTitle.textContent = libraryBook.title;
    bookAuthor.textContent = libraryBook.author;
    updateReadBtn(bookReadBtn, libraryBook);
    bookReadBtn.addEventListener("click", () => {
      libraryBook.readToggle();
      updateReadBtn(bookReadBtn, libraryBook);
    });
    bookRemoveBtn.addEventListener("click", () => {
      bookLibrary = bookLibrary.filter((book) => {
        return book !== libraryBook;
      });
      resetLibrary();
      updateLibrary();
    });
    bookRemoveBtn.classList.add("remove");
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookReadBtn);
    book.appendChild(bookRemoveBtn);
    book.classList.add("book");
    libraryElem.appendChild(book);
  }
}
function isInLibrary(newBook) {
  for (const libraryBook of bookLibrary) {
    if (
      newBook.title === libraryBook.title &&
      newBook.author === libraryBook.author
    ) {
      return true;
    }
  }
}
function updateReadBtn(bookReadBtn, libraryBook) {
  if (libraryBook.read) {
    bookReadBtn.textContent = "Read";
    bookReadBtn.classList.add("read");
    bookReadBtn.classList.remove("not-read");
  } else {
    bookReadBtn.textContent = "Not Read";
    bookReadBtn.classList.add("not-read");
    bookReadBtn.classList.remove("read");
  }
}
