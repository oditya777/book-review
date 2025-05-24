# Book Review API

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication

## Setup Instructions

. Run `npm install` to install dependencies.
. Create a `.env` file with the following content:

JWT_SECRET=your_jwt_secret_key
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=bookdb
DB_DIALECT=mysql


## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
- `POST /api/login` - Login and receive JWT token

### Books
- `POST /api/books` - Add a new book (Authenticated)
- `GET /api/books` - Get all books with optional filters and pagination
- `GET /api/books/:id` - Get book details by ID including reviews
- `GET /api/search?query=` - Search books by title or author

### Reviews
- `POST /api/books/:id/reviews` - Add a review (Authenticated)
- `PUT /api/reviews/:id` - Update own review (Authenticated)
- `DELETE /api/reviews/:id` - Delete own review (Authenticated)

