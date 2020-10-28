class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {

  addBookToList(book) {
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

  showAlert(msg, type) {
    // Create element
    const div = document.createElement('div');
    // Add className
    div.className = `alert ${type}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get Parent
    const container = document.querySelector('.container'),
          form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);
  
    // Timeout after 3sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      console.log(target)
      target.parentElement.parentElement.remove();

      const ui = new UI();
    // Show Alert
      ui.showAlert('Book Removed!', 'success');
    }

  }

  clearFields() {
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
  }

}

// Local storage class
class Store {

  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }

  static displayBooks(){
     const books = Store.getBooks();

    books.forEach(function(book) {
     const ui = new UI();

    //  Addb book to UI
     ui.addBookToList(book)
    })


  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
     });

     localStorage.setItem('books', JSON.stringify(books))
 
  }

}


// DOM Load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

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

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to localStorage
    Store.addBook(book);
  
    // Show Alert
    ui.showAlert('Book Added', 'success')
    // Clear fields
    ui.clearFields();

  }


  e.preventDefault();

});

// Event Listeners
document.querySelector('#book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
 

  e.preventDefault();
});

