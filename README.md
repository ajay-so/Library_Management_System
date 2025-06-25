# Library Management System (LMS)

A full-stack backend project built with Node.js, Express.js, MongoDB, and JWT authentication. The Library Management System (LMS) enables users to register/login, borrow books, leave reviews, and manage personal and book-related data. Authors can manage their books, and the system also supports file uploads (e.g., profile picture, book cover) using Multer middleware.

---

## Features

### Authentication & Authorization

* User registration and login with secure password hashing (bcrypt)
* JWT-based authentication
* Role-based access control (`user`, `author`)

### Book Management

* Authors can add, update, delete books
* Users can browse, filter, and paginate book listings
* Upload book cover image using Multer

### Loan System

* Users can borrow books
* Tracks status (`borrowed`, `returned`)
* View user's own borrowed books

### Review System

* Users can review books (rating + comment)
* Get all reviews for a book

### User Profile

* View user details
* Upload profile picture

---

## Folder Structure

```
├── controllers
├── models
├── routes
├── services
├── middleware
├── utils
├── config
├── uploads
└── server.js
```

---

## Security & Middleware

* Password hashing using bcrypt
* JWT token validation middleware
* Error handling middleware
* Multer middleware for file uploads

---

## API Testing

Tested using Postman with:

* JWT tokens passed in headers for protected routes
* File uploads tested with form-data

---

## Database

* MongoDB Atlas (or local MongoDB)
* Mongoose used for ODM and schema validation

---

## Status

 Completed till Day 6 (Books, Loans, Reviews, Users, Authentication)
 API testing in progress with dummy data
 API documentation being written

---

## Prepared by

**Ajay Kumar Ray**

Project Duration: 10 Days
Current Day: 6 Completed 
