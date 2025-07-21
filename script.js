//UI Elements
const booksGrid = document.querySelector(".books-grid");
const addBookBtn = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const addBookForm = document.querySelector(".add-book-form");
//Modal Functions

addBookBtn.addEventListener("click", () => {
  addBookForm.reset();
  modal.showModal();
});
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector(".title-input").value;
  const author = document.querySelector(".author-input").value;
  const pages = document.querySelector(".pages-input").value;
  const hasRead = document.querySelector(".has-read-input").checked;
  console.log(hasRead);
  addBook(title, author, pages, hasRead);
  fillGrid();
  modal.close();
});
//Library Functions and Variables
const myLibrary = [
  { title: "Where's Waldo", author: "Waldo", pages: 20, id: 1, haveRead: true },
];

function Book(title, author, pages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.haveRead ? "have read" : "not read yet"
    }`;
  };
}

function addBook(title, author, pages, haveRead) {
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

function fillGrid() {
  booksGrid.innerHTML = "";
  for (const book of myLibrary) {
    createBookCard(book);
  }
}

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("button");
  removeBtn.classList.add("button");
  readBtn.addEventListener("click", (e) => {
    book.haveRead = !book.haveRead;
    fillGrid();
  });
  removeBtn.addEventListener("click", (e) => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    fillGrid();
  });

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";
  if (book.haveRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};

fillGrid();
