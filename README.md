# E-Commerce Store RESTful API

This is a Node.js-based RESTful API for an e-commerce store, providing various functionalities for users and administrators. It's designed to handle user authentication, order management, product management, and user profile operations.

## Features

- User Authentication:
  - User registration with hashed passwords
  - User login with JSON Web Tokens (JWT) for secure authentication
- User Management:
  - User profile update and deletion (authorized users)
- Product Management:
  - Create, update, and delete products (admins only)
  - View a list of all products
- Order Management:
  - Create and manage orders
  - Delete orders
- Administrator Functions:
  - Admin registration (with admin privileges)
  - Admins can create, delete, and update products
  - Admins can view a list of all users or one specific user

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt for password hashing
- Mongoose for MongoDB modeling
- Other necessary libraries and packages

## Installation

1. Clone the repository:
2. In your command line run:
   git clone <REPOSITORY_URL> (it clones the repository)
   cd <PROJECT_DIRECTORY>
   npm install(it installs all the necessary packages)
   npm start(to start the server)

3. Use postman for handling request


