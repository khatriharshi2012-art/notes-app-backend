# Notes App Backend

A RESTful API backend for a Notes application built with Express.js and MongoDB.

## Features

- User authentication with JWT
- Create, read, update, and delete notes
- Todo management
- Secure password hashing with bcrypt
- CORS support for cross-origin requests
- MongoDB database with Mongoose ODM

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Security:** bcrypt/bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=your_port
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage

### Development
```bash
npm run dev
```
The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### User Routes
- `POST /user/register` - Register a new user
- `POST /user/login` - Login user
- `GET /user/:id` - Get user by ID (Protected)

### Notes Routes
- `GET /notes` - Get all notes (Protected)
- `POST /notes` - Create a note (Protected)
- `PUT /notes/:id` - Update a note (Protected)
- `DELETE /notes/:id` - Delete a note (Protected)

### Todo Routes
- `GET /todo` - Get all todos (Protected)
- `POST /todo` - Create a todo (Protected)
- `PUT /todo/:id` - Update a todo (Protected)
- `DELETE /todo/:id` - Delete a todo (Protected)

## Project Structure

```
├── controllers/       # Request handlers
│   ├── notes.controllers.js
│   ├── todo.controllers.js
│   └── user.controllers.js
├── middleware/        # Custom middleware
│   └── auth.middleware.js
├── models/            # Mongoose models
│   ├── notes.models.js
│   ├── todo.models.js
│   └── user.models.js
├── routes/            # API routes
│   ├── notes.routes.js
│   ├── todo.routes.js
│   └── user.routes.js
├── index.js           # Entry point
├── package.json
└── README.md
```

## License

ISC
