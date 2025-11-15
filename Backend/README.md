# Ideamagix Backend - Online Lecture Scheduling API

Backend API for the Online Lecture Scheduling Module built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access (Admin/Instructor)
- **User Management**: Register, login, profile management
- **Course Management**: CRUD operations for courses
- **Lecture Management**: Create, assign, and manage lectures
- **Instructor Assignment**: Assign lectures to instructors with conflict checking
- **RESTful API**: Clean and organized API endpoints

## 📁 Project Structure

```
Backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── auth.controller.js   # Authentication logic (login, register, getMe)
│   ├── user.controller.js   # User management logic
│   ├── course.controller.js # Course management logic
│   └── lecture.controller.js # Lecture management logic
├── middleware/
│   ├── auth.middleware.js   # JWT authentication & role checking
│   └── error.middleware.js  # Global error handler
├── models/
│   ├── User.js              # User/Instructor schema
│   └── Course.js            # Course and Lecture schemas
├── routes/
│   ├── auth.routes.js       # Authentication routes
│   ├── user.routes.js       # User routes
│   ├── course.routes.js     # Course routes
│   └── lecture.routes.js    # Lecture routes
├── scripts/
│   └── seed.js              # Database seeding script
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── server.js                # Application entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Navigate to Backend folder**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and update:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lecture-scheduling
   JWT_SECRET=your-secret-key-change-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas connection string in `.env`

5. **Seed the database** (Optional but recommended)
   ```bash
   npm run seed
   ```
   
   This will create:
   - 1 Admin user
   - 5 Instructor users
   - 5 Courses with lectures
   - Some lectures pre-assigned to instructors

6. **Start the server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 🔑 Default Login Credentials (After Seeding)

**Admin:**
- Email: `admin@test.com`
- Password: `password123`

**Instructors:**
- Email: `instructor1@test.com` to `instructor5@test.com`
- Password: `password123`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new instructor | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/instructors` | Get all instructors | Private |
| GET | `/api/users/instructors/:id` | Get instructor by ID | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Course Routes (`/api/courses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | Get all courses | Private |
| POST | `/api/courses` | Create new course | Admin |
| GET | `/api/courses/:id` | Get course by ID | Private |
| PUT | `/api/courses/:id` | Update course | Admin |
| DELETE | `/api/courses/:id` | Delete course | Admin |
| POST | `/api/courses/:id/lectures` | Add lecture to course | Admin |
| GET | `/api/courses/:id/instructors` | Get course instructors | Private |

### Lecture Routes (`/api/lectures`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/lectures` | Get all lectures | Private |
| GET | `/api/lectures/unassigned` | Get unassigned lectures | Admin |
| GET | `/api/lectures/instructor/:id` | Get lectures by instructor | Private |
| PUT | `/api/lectures/assign` | Assign lecture to instructor | Admin |
| PUT | `/api/lectures/:courseId/:lectureId` | Update lecture | Admin |
| DELETE | `/api/lectures/:courseId/:lectureId` | Delete lecture | Admin |

## 📝 API Request Examples

### Register New Instructor
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobile": "+1234567890",
  "bio": "Experienced web developer"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "password123"
}
```

Response:
```json
{
  "_id": "...",
  "id": "...",
  "name": "Admin User",
  "email": "admin@test.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Course (Admin only)
```bash
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced JavaScript",
  "level": "Advanced",
  "description": "Deep dive into JavaScript",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Assign Lecture to Instructor (Admin only)
```bash
PUT /api/lectures/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "lectureId": "lecture_id_here",
  "courseId": "course_id_here",
  "instructorId": "instructor_id_here"
}
```

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

After login, include the token from the response in all subsequent requests.

## 🗄️ Database Models

### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: String (admin/instructor)
- `mobile`: String
- `bio`: String
- `avatarUrl`: String

### Course Model
- `name`: String (required)
- `level`: String (Beginner/Intermediate/Advanced)
- `description`: String
- `imageUrl`: String
- `lectures`: Array of Lecture subdocuments

### Lecture Subdocument
- `title`: String (required)
- `date`: Date (required)
- `duration`: Number (required, in minutes)
- `instructorId`: Reference to User (optional)
- `courseId`: Reference to Course

## 🚦 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

Error responses include a `message` field explaining the error.

## 🔧 Development

The project uses ES Modules (`"type": "module"` in package.json).

Run in development mode with auto-reload:
```bash
npm run dev
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Request validation

## 🌐 Connecting Frontend

To connect the frontend to this backend:

1. Update frontend API calls to point to `http://localhost:5000/api`
2. Store the JWT token from login response
3. Include token in Authorization header for protected routes
4. Update the frontend Context/DataContext to use API calls instead of local state

Example frontend setup:
```javascript
const API_URL = 'http://localhost:5000/api';

// Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await response.json();
localStorage.setItem('token', data.token);

// Protected request
const response = await fetch(`${API_URL}/courses`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## ❗ Troubleshooting

### Error: "The `uri` parameter to `openUri()` must be a string, got 'undefined'"

**Cause:** The `.env` file is missing or `MONGODB_URI` is not set.

**Solution:**
1. Make sure you've created the `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and verify `MONGODB_URI` is set:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lecture-scheduling
   ```
3. If using MongoDB Atlas, use your connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lecture-scheduling
   ```
4. Restart the server:
   ```bash
   npm run dev
   ```

### Error: "MongoServerError: connect ECONNREFUSED"

**Cause:** MongoDB is not running or not accessible.

**Solution:**
- **For local MongoDB:** Start MongoDB service
  ```bash
  # macOS (with Homebrew)
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  
  # Windows
  net start MongoDB
  ```
- **For MongoDB Atlas:** Check your connection string and network access settings

### Server starts but API returns 401 Unauthorized

**Cause:** Missing or invalid JWT token.

**Solution:**
1. First login to get a token:
   ```bash
   POST http://localhost:5000/api/auth/login
   ```
2. Use the returned token in subsequent requests:
   ```
   Authorization: Bearer <your_token_here>
   ```

### "npm run seed" fails

**Cause:** Database connection issue or `.env` not configured.

**Solution:**
1. Ensure MongoDB is running
2. Verify `.env` file exists and has correct `MONGODB_URI`
3. Check that you can connect to MongoDB

### Error: "listen EADDRINUSE: address already in use :::5000"

**Cause:** Port 5000 is already being used by another process.

**Solution:**
1. **Find and stop the process using port 5000:**
   ```bash
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   
   # Windows (find process ID first)
   netstat -ano | findstr :5000
   # Then kill it using the PID
   taskkill /PID <process_id> /F
   ```

2. **Or use a different port:**
   - Update `.env` file:
     ```env
     PORT=3000
     ```
   - Or set it temporarily:
     ```bash
     PORT=3000 npm run dev
     ```

## 📄 License

ISC
