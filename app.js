// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Create UI prototype
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols into row
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">&times;</a></td>
  `;
// Append row to list
  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(msg, type) {
  // Create element
  const div = document.createElement('div');
  // Add className
  div.className = `alert ${type}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get Parent
  const container = document.querySelector('.container')
        form = document.querySelector('#book-form');
  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();

    const ui = new UI();
     // Show Alert
  ui.showAlert('Book Removed!', 'success');
  }
}

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

// Store Ohbject
function Store() {

}

// Add books to local storage
Store.prototype.addBooksToLocalStorage = function(book) {
  let books;

  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

// Get books from localstorage and display in page
Store.prototype.getBookFromLocalStorage = function() {
  let books;

  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book) {
    const ui = new UI();

    ui.addBookToList(book);
  });

}

// Delete book from local storage
Store.prototype.removeBookFromLocalStorage = function(isbn) {
  let books;

  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));

}




// Instantiate the Store class
const store = new Store();
// Add Event listener on document
document.addEventListener('DOMContentLoaded', store.getBookFromLocalStorage);




// Event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {

  // Create our variables and get Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;


  // Instantiating Book Object
  const book = new Book(title, author, isbn);

  // Instantiating UI Object
  const ui = new UI();
  // Instantiating Storage Object
  const store = new Store();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
     
    // Add to local storage
    store.addBooksToLocalStorage(book);
  
    // Show Alert
    ui.showAlert('Book Added', 'success')
    // Clear fields
    ui.clearFields();

  }


  e.preventDefault();

});

// Event Listeners
document.querySelector('#book-list').addEventListener('click', function(e) {

  // Instantiating the UI class
  const ui = new UI();
  // Instantiating the store class
  const store = new Store();

// Delete from ui method
  ui.deleteBook(e.target);
// Delete from LS method
store.removeBookFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);


  e.preventDefault();
})