# 📚 RESTful API — Books, Users & Reviews

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)

---

## 📌 Project Overview

A fully functional **RESTful API** built with **Node.js and Express.js** that manages Books, Users, and Reviews. Designed with security and scalability in mind — featuring JWT-based authentication, password hashing, and a clean MongoDB schema structure.

> 💡 This project demonstrates real-world backend development practices used in production applications.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | Web framework and routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB schema design |
| **JWT** | Secure user authentication |
| **bcrypt** | Password hashing and security |
| **Postman** | API testing and documentation |

---

## 🔗 API Endpoints

### 👤 User Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login and receive JWT token |
| GET | `/api/users/profile` | Get user profile (Protected) |

### 📖 Book Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get single book by ID |
| POST | `/api/books` | Add new book (Protected) |
| PUT | `/api/books/:id` | Update book (Protected) |
| DELETE | `/api/books/:id` | Delete book (Protected) |

### ⭐ Review Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books/:id/reviews` | Get all reviews for a book |
| POST | `/api/books/:id/reviews` | Add review (Protected) |
| DELETE | `/api/reviews/:id` | Delete review (Protected) |

---

## 🏗️ Project Structure

```
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js            # User schema
│   ├── Book.js            # Book schema
│   └── Review.js          # Review schema
├── routes/
│   ├── userRoutes.js      # User endpoints
│   ├── bookRoutes.js      # Book endpoints
│   └── reviewRoutes.js    # Review endpoints
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   └── reviewController.js
└── server.js              # Entry point
```

---

## 🔧 Key Features

### ✅ JWT Authentication
- Secure user registration and login
- Token-based protected routes
- Middleware to verify JWT on every protected request

### ✅ Password Security
- Passwords hashed with **bcrypt** before storing
- Plain text passwords never stored in database

### ✅ MongoDB Schema Design
- Relational-style referencing between Users, Books and Reviews
- Efficient data retrieval with Mongoose populate()

### ✅ Complete CRUD Operations
- Full Create, Read, Update, Delete for all resources
- Proper HTTP status codes and error handling

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### Step 1 — Clone the repo
```bash
git clone https://github.com/prashikBesekar/restful-api-books
cd restful-api-books
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Create .env file
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Step 4 — Run the server
```bash
npm start
# Server running on http://localhost:5000
```

### Step 5 — Test with Postman
Import the collection and test all endpoints with JWT authentication flow.

---

## 📸 Key Learnings

- Building production-ready **RESTful APIs** with Node.js and Express
- Implementing **JWT authentication** and protected route middleware
- Designing **MongoDB schemas** with Mongoose and relational referencing
- Proper **API error handling** and HTTP status codes
- **Security best practices** — password hashing, token expiry, input validation

---

## 🔗 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Prashik_Besekar-blue?style=flat&logo=linkedin)](https://linkedin.com/in/prashik-besekar)
[![GitHub](https://img.shields.io/badge/GitHub-prashikBesekar-black?style=flat&logo=github)](https://github.com/prashikBesekar)

---

⭐ **If this project helped you, please give it a star!**
