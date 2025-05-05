# 🎓 College Event Management Module

A full-stack web application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) that allows authorized users to manage various types of college events with ease and flexibility.

---

## 🚀 Objective

To develop a robust and intuitive web platform where users can:
- Register and login securely
- Create, edit, delete, and view events
- Search through events
- Upload images and categorize events based on type

---

## 🧩 Features

### 🔐 Authentication
- User **Registration** & **Login**
- Authenticated users can access and perform all event operations
- JSON Web Token (JWT)-based secure session management

### 🖥️ Frontend (React + Vite)
- Responsive UI with clean layout and navigation
- **Create Event**:
  - Upload event images
  - Select event type (Academic, Cultural, Sports, etc.)
- **Event List**:
  - Display all events in a grid/list
  - View event details in a pop-up/modal
- **Search Functionality** to filter events
- **Edit/Delete Event**
- Uses Axios for API communication
- State and context management for authentication

### 🛠️ Backend (Express + MongoDB)
- RESTful API endpoints:
  - `GET /api/events` – List all events
  - `POST /api/events` – Add new event
  - `GET /api/events/:id` – Get specific event
  - `PUT /api/events/:id` – Edit event
  - `DELETE /api/events/:id` – Delete event
- JWT-based user authentication middleware
- Mongoose for MongoDB schema modeling
- File uploads handled using `multer`


## ⚙️ Installation & Setup

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Vite CLI (`npm install -g vite`)

### 1. Clone the repository

```bash
git clone https://github.com/urvi777/college-event-management.git
cd college-event-management
````

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📁 Folder Structure

```
client/         # React frontend (Vite)
├── components/
├── context/
└── App.jsx

server/         # Express backend
├── routes/
├── controllers/
└── server.js
```

---

## 📄 License

This project is licensed under the MIT License.