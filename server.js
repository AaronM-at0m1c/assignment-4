const express = require('express');
const app = express();
const port = 3003;

// Middleware for parsing JSON
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    },
    {
        id: 4,
        title: "Confessions",
        author: "Augustine of Hippo",
        genre: "Nonfiction",
        copiesAvailable: 2
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        genre: "Fantasy",
        copiesAvailable: 12
    }
];

// Root endpoint - API homepage
app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the book API", 
        endpoints: { 
            "GET /books": "Get all books", 
            "GET /books/:id": "Get a specific book by ID" 
        } 
    }); 
});

// GET /books - Return all books
app.get('/books', (req, res) => {
      // Sends back the books as JSON as the response to the request
      res.json(books);
});

// GET /books/{id} - Return a specific book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(m => m.id === bookId);
  
	// Return book if it is found
    if (book) {
        res.json(book);
    } else {
        // If the book is not found, return 404
        res.status(404).json({ error: 'Book not found' });
    }
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
    // Extract data from request body
    const { title, author, genre, copiesAvailable } = req.body;
  
    // Create new book with generated ID
    const newbook = {
        id: books.length + 1,
        title,
        author,
        genre,
        copiesAvailable
    };
  
    // Add to books array
    books.push(newbook);
    
    // Return the created book with 201 status
    res.status(201).json(newbook);
});

// PUT /books/:id - Update an existing book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, genre, copiesAvailable } = req.body;
    
    // Find the book to update
    const bookIndex = books.findIndex(m => m.id === bookId);
    
    if (bookIndex === -1) {
        // If the book is not found, return 404
        return res.status(404).json({ error: 'Book not found' });
    }
    
    // Update the book
    books[bookIndex] = {
        id: bookId,
        title,
        author,
        genre,
        copiesAvailable
    };
    
    // Return the updated book
    res.json(books[bookIndex]);
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  
  // Find the book index
  const bookIndex = books.findIndex(m => m.id === bookId);
  
  if (bookIndex === -1) {
    // If the book is not found, return 404
    return res.status(404).json({ error: 'Book not found' });
  }
  
  // Remove the book from array
  const deletedbook = books.splice(bookIndex, 1)[0];
  
  // Return the deleted book
  res.json({ message: 'Book deleted successfully', book: deletedbook });
});

// Start the server
app.listen(port, () => {
    console.log(`Bookstore API running at http://localhost:${port}`);
});
