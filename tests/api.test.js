const request = require('supertest');
const app = require('../server'); //Import server.js

describe('Bookstore API', () => {
    
    test('should return all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5); //Server starts with 5 books

});

    test('should return book by ID', async () => {
    const response = await request(app).get('/books/4');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 4);
    expect(response.body).toHaveProperty('title');

});

    test('should return book full data', async () => {
    const response = await request(app).get('/books/5');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(5);
    expect(response.body.title).toBe('The Hobbit');
    expect(response.body.author).toBe('J.R.R. Tolkien');
    expect(response.body.genre).toBe('Fantasy');
    expect(response.body.copiesAvailable).toBe(12);

});

    test('should return 404 when providing invalid book ID', async () => {
    const response = await request(app).get('/books/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');

});

    test('should create a new book', async () => {
    const newBook = {
        title: "The Web Application Hacker's Handbook",
        author: "Dafydd Stuttard and Marcus Pinto",
        genre: "Educational",
        copiesAvailable: 4
    };

    const response = await request(app)
        .post('/books')
        .send(newBook);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe("The Web Application Hacker's Handbook");

});

    test('should return 400 error if new book is empty', async () => {
    const newBook = {
    };

    const response = await request(app)
        .post('/books')
        .send(newBook);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

});

    test('should update existing book', async () => {
    const updatedBook = {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-fi",
        copiesAvailable: 5
    };

    const response = await request(app)
        .put('/books/1')
        .send(updatedBook);
  
    expect(response.status).toBe(200);
    expect(response.body.genre).toBe('Sci-fi');
    expect(response.body.author).toBe('Frank Herbert');
    expect(response.body.copiesAvailable).toBe(5);

});

    test('should return 400 error if updated book is empty', async () => {
    const updatedBook = {
    };

    const response = await request(app)
        .put('/books/1')
        .send(updatedBook);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

});

    test('should delete existing book', async () => {
    const response = await request(app).delete('/books/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
});

    test('should return 404 when providing invalid book ID for deletion', async () => {
    const response = await request(app).delete('/books/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');

});

    test('should return 400 error if new book is invalid json', async () => {
    const newBook = "abcdef";

    const response = await request(app)
        .post('/books')
        .send(newBook);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

});

    test('should return 400 error if updated book is invalid json', async () => {
    const updatedBook = "abcdef"

    const response = await request(app)
        .put('/books/1')
        .send(updatedBook);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');

});
});