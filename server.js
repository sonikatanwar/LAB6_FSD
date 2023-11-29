const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Example in-memory database
// Example in-memory database
let books = [
    {
        isbn: '1234567890',
        title: 'Example Book 1',
        author: 'Sonika',
        publisher: 'Sample Publisher',
        publisheddate: '2023-01-01',
        numOfPages: 200
    },
    {
        isbn: '9876543210',
        title: 'Example Book 2',
        author: 'Prats',
        publisher: 'Another Publisher',
        publisheddate: '2023-02-01',
        numOfPages: 250
    }
];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); // Assuming your HTML and JS files are in a 'public' folder

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a specific book by ISBN
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Create a new book
app.post('/book', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Delete a book
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(b => b.isbn !== isbn);
    res.status(204).send();
});

// Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/book-list.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
