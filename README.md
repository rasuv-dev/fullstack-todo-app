# Full-Stack Todo App

> A full-stack project built to practice and strengthen my foundations in **React.js, Tailwind CSS, Express.js, MongoDB, and JWT authentication** through a complete frontend-to-backend implementation.

## Live Demo

|                 | Link                                             |
| --------------- | ------------------------------------------------ |
| **Frontend**    | https://fullstack-todo-app-liart-zeta.vercel.app |
| **Backend API** | https://fullstack-todo-app-beryl.vercel.app      |

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat\&logo=tailwindcss\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat\&logo=vite\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat\&logo=jsonwebtokens\&logoColor=white)

## Features

| Authentication     | Task Management | Backend                   |
| ------------------ | --------------- | ------------------------- |
| User registration  | Create tasks    | REST API                  |
| User login         | View tasks      | JWT middleware            |
| JWT authentication | Update tasks    | bcrypt password hashing   |
| Protected routes   | Delete tasks    | MongoDB + Mongoose        |
| User-specific data | Task ownership  | CORS + environment config |

## Architecture

```text
┌──────────────────────┐
│      React + Vite    │
│    Tailwind CSS UI   │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│   Express.js API     │
│ JWT Authentication   │
│      Middleware      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ MongoDB + Mongoose   │
│ Users + Tasks        │
└──────────────────────┘
```

## API Endpoints

### Authentication

| Method | Endpoint    | Auth   |
| ------ | ----------- | ------ |
| `POST` | `/register` | Public |
| `POST` | `/login`    | Public |

### Tasks

| Method | Endpoint       | Auth |
| ------ | -------------- | ---- |
| `POST` | `/add-task`    | JWT  |
| `GET`  | `/tasks`       | JWT  |
| `POST` | `/update-task` | JWT  |
| `POST` | `/delete-task` | JWT  |

### System

| Method | Endpoint  | Purpose      |
| ------ | --------- | ------------ |
| `GET`  | `/`       | API status   |
| `GET`  | `/health` | Health check |

Protected routes use:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Authentication Flow

```text
Register / Login
       ↓
   JWT Token
       ↓
Authorization Header
       ↓
JWT Verification
       ↓
Authenticated User
       ↓
User-specific Tasks
```

## Project Structure

```text
client/
├── components/
├── pages/
├── api.js
├── App.jsx
└── main.jsx

server/
├── db/
├── middleware/
├── model/
├── services/
├── app.js
└── server.js
```

## What I Practiced

```text
React.js
├── Components
├── State & Effects
├── React Router
├── Forms
└── API Integration

Tailwind CSS
├── Utility Classes
├── Responsive UI
└── Component Styling

Express.js
├── REST APIs
├── Middleware
├── Services
└── Error Handling

Authentication
├── JWT
├── Protected Routes
├── bcrypt Password Hashing
└── User Authorization

MongoDB
├── Mongoose Models
├── CRUD Operations
└── User-specific Data
```

## Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend API URL can be configured through the Vite environment variable for local and deployed environments.

## Deployment

```text
Frontend ──────────► Vercel
                      │
                      │ REST API
                      ▼
Backend ───────────► Vercel
                      │
                      ▼
                  MongoDB
```

## Purpose

Built as hands-on practice to strengthen my understanding of **frontend development, backend development, API integration, database operations, and JWT-based authentication** in a complete full-stack application.
