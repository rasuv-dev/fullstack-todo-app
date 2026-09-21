
# Full-Stack Todo App

A full-stack Todo application built to practice and apply the fundamentals of **React.js, Tailwind CSS, Express.js, MongoDB, and JWT authentication**.

This project helped me understand how a frontend application communicates with a backend API, how authentication works, and how user-specific data can be managed securely.

## Project Overview

The application allows users to register, log in, and manage their own tasks.

Users can create, view, update, and delete tasks after successful authentication. JWT is used to protect task-related API routes and ensure that users can access only their own tasks.

## Features

- User registration using email and password
- User login using JWT authentication
- Protected API routes
- Create, read, update, and delete tasks
- User-specific task management
- Password hashing using bcryptjs
- MongoDB database integration
- Responsive UI using Tailwind CSS
- Client-side routing using React Router
- REST API development using Express.js
- ES modules used in the backend

## Technologies Used

### Frontend

- React.js
- React Router
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- CORS

## Concepts Practiced

Through this project, I practiced and applied the following concepts:

### React.js

- Creating reusable React components
- Managing component state using `useState`
- Handling side effects using `useEffect`
- Managing navigation with React Router
- Handling form inputs and form submission
- Communicating with backend APIs using `fetch`
- Managing authentication state using local storage

### Tailwind CSS

- Styling React components using utility classes
- Creating responsive layouts
- Designing forms, buttons, navigation bars, and task cards
- Applying spacing, colors, borders, and typography

### Express.js

- Creating an Express server
- Building REST API endpoints
- Handling JSON requests and responses
- Organizing application logic into services
- Using middleware
- Configuring CORS
- Managing environment variables

### JWT Authentication

- Registering users with email and password
- Hashing passwords before storing them
- Generating JWT tokens after login
- Protecting API routes using authentication middleware
- Verifying JWT tokens on protected requests
- Associating tasks with authenticated users

### MongoDB and Mongoose

- Connecting an Express application to MongoDB
- Creating Mongoose schemas and models
- Storing users and tasks in the database
- Performing database operations
- Filtering tasks using the authenticated user's ID

## Project Structure

```text
fullstack-todo-app/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AddTaskCard.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── TodoItem.jsx
│   │   ├── pages/
│   │   │   ├── AddTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   ├── ListTodos.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── db/
│   │   └── dbconfig.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── model/
│   │   ├── Task.js
│   │   └── User.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── task.service.js
│   ├── .env.example
│   ├── app.js
│   └── package.json
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rasuv-dev/fullstack-todo-app.git
cd fullstack-todo-app
```

## Backend Setup

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
```

### 4. Start the backend server

For development:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:3000
```

## Frontend Setup

### 5. Install frontend dependencies

Open a new terminal and run:

```bash
cd client
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in an existing user |

### Task Routes

These routes require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-task` | Create a new task |
| GET | `/tasks` | Get the authenticated user's tasks |
| POST | `/update-task` | Update an existing task |
| POST | `/delete-task` | Delete a task |

### General Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check whether the API is running |
| GET | `/health` | Check server health |

## Authentication Flow

1. A user registers with an email and password.
2. The password is hashed before being stored in MongoDB.
3. The user logs in with their credentials.
4. The server verifies the credentials and generates a JWT.
5. The frontend stores the token in local storage.
6. The token is sent with protected API requests.
7. The backend verifies the token before allowing access to task routes.
8. Tasks are associated with the authenticated user's ID.

Protected requests use the following authorization format:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## What I Practiced and Learned

This project gave me practical experience with:

- Building a React frontend from reusable components
- Connecting a React application to an Express REST API
- Managing application state and form data
- Implementing user authentication with JWT
- Protecting backend routes with middleware
- Hashing and validating user passwords
- Connecting MongoDB with an Express application
- Structuring backend logic using models, services, and middleware
- Managing user-specific data
- Styling a web application with Tailwind CSS
- Working with environment variables and API configuration

## Future Improvements

- Add task completion status
- Add task priorities and due dates
- Add search and filtering
- Add pagination
- Improve validation and error handling
- Add automated tests
- Add refresh-token functionality
- Deploy the frontend and backend

## License

This project was created for learning, practice, and improving my full-stack development skills.