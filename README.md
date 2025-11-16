# IDEAMAGIX - Online Lecture Scheduling System

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A comprehensive, enterprise-grade lecture scheduling and management platform built with React, JavaScript, Express, and MongoDB. This full-stack solution delivers seamless course management experiences with advanced features including role-based access control, real-time lecture scheduling, intelligent admin dashboard, batch management, and automated date-based filtering for modern educational institutions.

## Live Preview

**Experience the application live:** 

- **Frontend:** https://ols-ideamagix-yash.netlify.app
- **Backend API:** https://ols-api.onrender.com

![Live Demo](https://img.shields.io/badge/Live%20Demo-Active-brightgreen?style=for-the-badge&logo=netlify&logoColor=white)

## Core Features

**Intelligent Course Management** - Comprehensive course catalog with batch management, lecture scheduling, instructor assignment, and dynamic filtering. Support for multiple course levels (Beginner, Intermediate, Advanced), detailed descriptions, image uploads, and automated date-based batch filtering.

**Role-Based Access Control** - Secure authentication system with distinct user roles (Admin, Instructor) featuring role-specific dashboards, protected routes, JWT-based authentication, and granular permission management for enhanced security.

**Smart Lecture Scheduling** - Real-time lecture scheduling with instructor assignment, date-based filtering, duration tracking, and automated status management. Lectures automatically move to "Completed" status the day after they're scheduled.

**Batch Management System** - Organize courses into batches with start dates, instructor assignments, and automatic filtering. Admin panel displays only current and upcoming batches, while past batches are automatically hidden.

**Advanced Admin Dashboard** - Powerful administrative interface with real-time statistics, course management, instructor oversight, batch control, lecture scheduling, and comprehensive analytics for total courses, instructors, and upcoming lectures.

**Instructor Dashboard** - Dedicated instructor portal displaying assigned lectures, upcoming schedules, completed lectures with smart date-based filtering, and personal lecture management with clear separation between upcoming and completed sessions.

**Date-Based Intelligence** - Sophisticated date filtering logic ensuring lectures appear in "Upcoming" only if scheduled for future dates (excluding today), and automatically move to "Completed" the next day. Batch visibility based on current date with automatic hiding of past batches.

**Responsive Design Excellence** - Mobile-first responsive architecture with Tailwind CSS ensuring optimal viewing across desktop, tablet, and mobile devices. Smooth animations and intuitive user interface with Lucide React icons.

**Image Upload System** - Secure course image upload functionality with size validation (up to 50MB), base64 encoding for database storage, and automatic compression for optimal performance.

**Secure Authentication System** - Enterprise-grade JWT-based authentication with bcrypt password hashing, automatic token refresh, secure session management with 7-day token expiration, and protected API endpoints.

## Technology Stack

| Technology | Version | Purpose | Implementation |
|------------|---------|----------|----------------|
| React | 18.x | Frontend UI framework with hooks and modern architecture | Functional components with Context API for state management |
| JavaScript | ES6+ | Primary programming language for full-stack development | Modern syntax with async/await and arrow functions |
| Express | 4.x | Backend API server for RESTful operations | Comprehensive middleware stack with error handling and validation |
| MongoDB | 8.x | NoSQL database for flexible data storage | Document-based storage with Mongoose ODM and schema validation |
| Mongoose | 8.x | MongoDB object modeling and validation | Schema design, middleware hooks, and query optimization |
| Node.js | 18+ | JavaScript runtime for server-side execution | Asynchronous event-driven architecture with ES6+ support |
| Vite | 5.x | Next-generation frontend build tool | Lightning-fast HMR, optimized bundling, and development server |
| Tailwind CSS | 3.x | Utility-first CSS framework | Responsive design, custom theming, and component styling |
| JWT | 9.x | Secure token-based authentication | Stateless authentication with role-based access control |
| Bcrypt | 2.x | Password hashing and security | Secure password encryption with salt rounds |
| React Router | 6.x | Client-side routing and navigation | Protected routes, nested routing, and dynamic navigation |
| Lucide React | Latest | Icon library for React components | Consistent iconography across the application |
| React Hot Toast | Latest | Toast notification system | User feedback for actions and errors |

## Quick Start

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9%2B-CB3837?style=flat-square&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8%2B-47A248?style=flat-square&logo=mongodb&logoColor=white)

Before you begin, make sure you have the following installed on your computer:

- **Node.js 18.0 or higher** - A JavaScript runtime that allows you to run the application
  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Choose the LTS (Long Term Support) version
  - npm (Node Package Manager) comes automatically with Node.js
  
- **MongoDB Atlas Account** - Cloud database to store all the application data
  - **Recommended:** Use MongoDB Atlas (Free Cloud Database)
    - Go to: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
    - Create a free account
    - Follow the setup wizard to create a free cluster
    - We'll get the connection string later
  
- **Git** - For downloading the project from GitHub
  - Download from: [https://git-scm.com/downloads](https://git-scm.com/downloads)
  
- **Code Editor** - To view and edit code (if needed)
  - Recommended: [Visual Studio Code](https://code.visualstudio.com/)

- **Modern Web Browser** - Chrome, Firefox, Edge, or Safari

### Step-by-Step Installation Guide

#### Step 1: Download the Project

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
# Clone (download) the project from GitHub
git clone https://github.com/yash3610/Ideamagix.git

# Navigate into the project folder
cd Ideamagix
```

**Don't have Git?** You can also download the project as a ZIP file:
- Go to: [https://github.com/yash3610/Ideamagix](https://github.com/yash3610/Ideamagix)
- Click the green "Code" button
- Click "Download ZIP"
- Extract the ZIP file and open the folder in your terminal

#### Step 2: Install Backend Dependencies

```bash
# Go to the Backend folder
cd Backend

# Install all required packages (this may take 2-5 minutes)
npm install
```

**What's happening?** This command downloads all the necessary libraries and tools that the backend needs to work.

#### Step 3: Install Frontend Dependencies

```bash
# Go back to the main project folder
cd ..

# Go to the Frontend folder
cd Frontend

# Install all required packages (this may take 2-5 minutes)
npm install
```

#### Step 4: Set Up MongoDB Atlas Database

**MongoDB Atlas Setup (Cloud - Recommended):**

1. Log in to your MongoDB Atlas account at https://cloud.mongodb.com/
2. Click on "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<username>` and `<password>` with your actual credentials
6. Keep this string safe - you'll need it in the next step

#### Step 5: Configure Backend Environment Variables

1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Create a new file named `.env` (exactly this name, with the dot at the start)

3. Open the `.env` file in a text editor and add the following:

```env
# Server Port
PORT=3001

# MongoDB Atlas Connection
# Replace with your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/lecture-scheduling?retryWrites=true&w=majority&appName=lecture-scheduling

# JWT Secret (for user authentication)
# Create a random secret key (any long random text)
JWT_SECRET=your-secret-key-change-in-production-ideamagix-2025

# Node Environment
NODE_ENV=development

# Frontend URL (don't change this for local development)
FRONTEND_URL=http://localhost:5173
```

**Important Notes:**
- Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
- Replace `your-username` and `your-password` with your MongoDB Atlas credentials
- Change `JWT_SECRET` to any random text (make it long and complex)

#### Step 6: Configure Frontend Environment Variables

1. Navigate to the Frontend folder:
   ```bash
   cd Frontend
   ```

2. Create a new file named `.env` in the Frontend folder

3. Open the `.env` file and add:

```env
# API Configuration (don't change this for local development)
VITE_API_URL=http://localhost:3001/api
```

**Note:** Keep this value as it is for local development.

### Running the Application

Now that everything is set up, let's start the application!

#### Option 1: Run Backend and Frontend Separately (Recommended for Beginners)

**Step 1: Start the Backend Server**

Open a terminal window and run:

```bash
# Navigate to the Backend folder
cd Backend

# Start the backend server
npm run dev
```

**What you should see:**
- The terminal will show "🚀 Ideamagix Server Started"
- "✅ MongoDB Atlas Connected"
- "📦 Database Name: lecture-scheduling"

**Keep this terminal window open!** The backend needs to keep running.

**Step 2: Start the Frontend Server**

Open a **NEW** terminal window (keep the backend terminal running) and run:

```bash
# Navigate to the Frontend folder
cd Frontend

# Start the frontend development server
npm run dev
```

**What you should see:**
- The terminal will show "Local: http://localhost:5173"
- Your browser might open automatically

**Step 3: Open the Application**

Open your web browser and go to:
```
http://localhost:5173
```

🎉 **Congratulations!** You should now see the IDEAMAGIX homepage!

### Seeding the Database

To populate your database with initial data (courses, instructors, lectures):

```bash
# Navigate to the Backend folder
cd Backend

# Run the seed script
npm run seed
```

**This will create:**
- 1 Admin user
- 2 Instructor users
- 4 Sample courses with lectures

**Login Credentials Created:**
```
Admin:
📧 Email: admin@ideamagix.com
🔑 Password: admin123

Instructor 1 (John Doe):
📧 Email: john@ideamagix.com
🔑 Password: instructor123

Instructor 2 (Jane Smith):
📧 Email: jane@ideamagix.com
🔑 Password: instructor123
```

### Accessing the Application

Once both servers are running:

- **Frontend (User Interface):** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/health
- **Admin Dashboard:** http://localhost:5173/admin/dashboard (after login as admin)
- **Instructor Dashboard:** http://localhost:5173/instructor/dashboard (after login as instructor)

### Troubleshooting Common Issues

#### "MongoDB connection failed"
- **Solution:** Check if your MONGODB_URI in `.env` is correct
- **Solution:** Make sure you've replaced username and password in the connection string
- **Solution:** For MongoDB Atlas, verify your IP address is whitelisted (use 0.0.0.0/0 for development)

#### "Port 3001 is already in use"
- **Solution:** Another application is using port 3001. Change the PORT in Backend `.env` to 3002 or another number

#### "npm install fails"
- **Solution:** Make sure you have a stable internet connection. Try running `npm cache clean --force` then `npm install` again

#### Frontend shows "Network Error"
- **Solution:** Make sure the backend server is running on http://localhost:3001
- **Solution:** Check if VITE_API_URL in Frontend `.env` matches your backend URL

#### Can't find `.env` file
- **Solution:** Make sure you're creating the file in the correct folder (Backend/.env and Frontend/.env) and that the filename starts with a dot

#### Images not uploading
- **Solution:** Check if the Backend/uploads folder exists. If not, create it manually
- **Solution:** Ensure you're uploading images under 50MB

### Next Steps

After successful setup:

1. **Explore the Application:**
   - Log in as admin to access the admin dashboard
   - View courses and batches
   - Check the lecture schedule
   - Manage instructors

2. **Access Admin Dashboard:**
   - Log in with admin credentials
   - Go to http://localhost:5173/admin/dashboard
   - Add courses, create batches, assign instructors, schedule lectures

3. **Access Instructor Dashboard:**
   - Log in with instructor credentials
   - Go to http://localhost:5173/instructor/dashboard
   - View assigned lectures
   - Check upcoming and completed lectures

4. **Development:**
   - Make changes to the code
   - The frontend will auto-refresh when you save files
   - The backend will auto-restart with nodemon

### Stopping the Application

When you're done:

1. Go to each terminal window
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. Type `Y` if prompted to confirm

This will stop both the frontend and backend servers.

## Application Usage

### Admin Experience

#### Dashboard Analytics
1. **Statistics Overview** - Monitor total courses, total instructors, upcoming lectures, and total lectures
2. **Real-Time Metrics** - View live statistics that update as you add courses, instructors, and lectures
3. **Quick Actions** - Access course management, instructor management, and lecture scheduling from the dashboard

#### Course Management
1. **Add Courses** - Create new courses with name, level (Beginner/Intermediate/Advanced), description, and image
2. **Edit Courses** - Update course information, change images, modify descriptions
3. **Delete Courses** - Remove courses from the system (with confirmation)
4. **View Batches** - See all batches for each course with automatic date-based filtering

#### Batch Management
1. **Create Batches** - Add new batches to courses with start dates
2. **Assign Instructors** - Assign instructors to specific batches
3. **Schedule Lectures** - Add lectures to batches with titles, dates, durations, and instructor assignments
4. **Smart Filtering** - Only current and upcoming batches are displayed; past batches are automatically hidden

#### Instructor Management
1. **View Instructors** - See all registered instructors with their details
2. **Instructor Assignments** - Track which instructors are assigned to which courses and lectures

### Instructor Experience

#### Dashboard Overview
1. **Welcome Message** - Personalized greeting with instructor name
2. **Statistics Cards** - View upcoming lectures count and total lectures assigned
3. **Upcoming Lectures List** - See next 5 upcoming lectures with course name, date, and duration

#### My Lectures
1. **Filter Options** - Toggle between Upcoming, Completed, and All lectures
2. **Smart Date Logic** - Lectures scheduled for future dates (excluding today) appear in "Upcoming"
3. **Automatic Updates** - Today's lectures automatically move to "Completed" tomorrow
4. **Detailed View** - See course name, lecture title, date, and duration in a comprehensive table

### Date-Based Filtering Logic

**Upcoming Lectures:**
- Only shows lectures with dates **greater than** today
- Today's lectures do NOT appear in upcoming
- Automatically updates at midnight

**Completed Lectures:**
- Shows lectures with dates **less than or equal to** today
- Today's lectures appear in completed
- Includes all past lectures

**Batch Visibility:**
- Admin panel shows batches with start dates **greater than or equal to** today
- Past batches are automatically hidden
- Ensures admins only work with current and future batches

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/auth/login` | POST | User login with credentials | None | `{"email": "admin@ideamagix.com", "password": "admin123"}` |
| `/api/auth/signup` | POST | Register new instructor account | None | `{"name": "John Doe", "email": "john@ideamagix.com", "password": "password123", "role": "instructor"}` |
| `/api/auth/me` | GET | Get current user profile | Required | None |

### Course Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/courses` | GET | Retrieve all courses | None | None |
| `/api/courses/:id` | GET | Get single course by ID | None | None |
| `/api/courses` | POST | Create new course | Admin | `{"name": "Web Development", "level": "Beginner", "description": "...", "imageUrl": "..."}` |
| `/api/courses/:id` | PUT | Update existing course | Admin | Same as POST |
| `/api/courses/:id` | DELETE | Delete course | Admin | None |

### Batch Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/courses/:courseId/batches` | POST | Add batch to course | Admin | `{"startDate": "2025-11-20", "instructorId": "123"}` |
| `/api/courses/:courseId/batches/:batchId` | PUT | Update batch | Admin | Same as POST |
| `/api/courses/:courseId/batches/:batchId` | DELETE | Delete batch | Admin | None |

### Lecture Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/lectures` | GET | Get all lectures | Required | Query: `?instructorId=123` |
| `/api/lectures/:id` | GET | Get specific lecture | Required | None |
| `/api/lectures` | POST | Create new lecture | Admin | `{"courseId": "123", "batchId": "456", "title": "Introduction", "date": "2025-11-20", "duration": 60, "instructorId": "789"}` |
| `/api/lectures/:id` | PUT | Update lecture | Admin | Same as POST |
| `/api/lectures/:id` | DELETE | Delete lecture | Admin | None |

### User Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/users/instructors` | GET | Get all instructors | Admin | None |
| `/api/users/:id` | GET | Get user by ID | Required | None |

## System Architecture

The application implements a modern three-tier architecture optimized for scalability, security, and maintainability:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Layer (React + JS)                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        │
│  │  Auth Pages   │  │ Admin Panel   │  │ Instructor    │        │
│  │  - Login      │  │  - Dashboard  │  │  - Dashboard  │        │
│  │  - Signup     │  │  - Courses    │  │  - Lectures   │        │
│  │               │  │  - Batches    │  │               │        │
│  │               │  │  - Instructors│  │               │        │
│  └───────────────┘  └───────────────┘  └───────────────┘        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Context API State Management                   │   │
│  │  - AuthContext     - DataContext                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ▼ HTTPS/REST API ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Application Layer (Express.js)                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Middleware Stack                        │  │
│  │  - CORS         - Body Parser  - JWT Auth                 │  │
│  │  - File Upload  - Error Handler - Rate Limiting          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Controllers  │  │  Middleware  │  │  Utilities   │           │
│  │  - Auth      │  │  - Auth      │  │  - Token Gen │           │  
│  │  - Courses   │  │  - Upload    │  │  - Helpers   │           │
│  │  - Lectures  │  │  - Validate  │  │  - Date Logic│           │
│  │  - Users     │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                            ▼ Mongoose ODM ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Data Layer (MongoDB Atlas)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │  Users   │  │ Courses  │  │ Lectures │                       │
│  │  Schema  │  │  Schema  │  │  Schema  │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  - Indexing for Performance                             │    │
│  │  - Schema Validation                                    │    │  
│  │  - Middleware Hooks (pre/post)                          │    │
│  │  - Population for References                            │    │  
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

**Architecture Highlights:**
- **Frontend**: React 18 with JavaScript, Context API for global state, React Router for navigation
- **Backend**: Express.js RESTful API with middleware stack, JWT authentication, and role-based authorization
- **Database**: MongoDB Atlas with Mongoose ODM for schema modeling, validation, and efficient querying
- **Security**: JWT for authentication, bcrypt for password hashing, CORS for cross-origin requests
- **File Storage**: Base64 encoding for image storage in MongoDB with 50MB size limit
- **Deployment**: Frontend on Netlify, Backend on Render, Database on MongoDB Atlas

## Performance Optimization

**Frontend Optimizations:**
- React.memo and useMemo for preventing unnecessary re-renders
- Image optimization with base64 encoding and size validation
- Debounced search and filtering to minimize API calls
- Optimistic UI updates for instant user feedback
- Lazy loading for route-based code splitting

**Backend Optimizations:**
- MongoDB connection pooling for efficient database operations
- Indexed database queries on frequently accessed fields
- Compression middleware for response payload reduction
- Rate limiting to prevent abuse
- Efficient error handling without stack trace exposure in production

**Database Optimizations:**
- Compound indexes for multi-field query optimization
- Schema design with embedded documents for batch and lecture data
- Projection to return only required fields
- Population for efficient data retrieval with references

## Development Features

**Hot Reload Development**
- Vite HMR for instant frontend updates without page refresh
- Nodemon integration for automatic backend server restarts on file changes
- Environment variable hot reloading for configuration updates

**Code Quality Tools**
- ESLint configuration for consistent JavaScript code style
- React hooks linting for proper hook usage patterns
- Express validator for comprehensive input sanitization
- Detailed server logging for debugging and monitoring

**Developer Experience**
- Comprehensive API documentation with request/response examples
- Modular component architecture for maintainability
- Centralized configuration management with environment variables
- Error boundaries for graceful error handling in React

## Deployment Guide

### Production Environment Variables

**Frontend (Netlify)**
```env
VITE_API_URL=https://ols-api.onrender.com/api
```

**Backend (Render)**
```env
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lecture-scheduling?retryWrites=true&w=majority
JWT_SECRET=your_production_secret_key_min_32_characters
FRONTEND_URL=https://ideamagix.netlify.app
```

### Build Commands

```bash
# Frontend build for production
cd Frontend
npm run build
# Output: dist/ folder ready for deployment

# Backend preparation for deployment
cd Backend
npm install
# Ensure .env is configured for production

# Seed database (first-time setup)
npm run seed
```

### Deployment Platforms

**Frontend Deployment (Netlify)**
```bash
# Build command: npm run build
# Publish directory: dist
# Base directory: Frontend
# Environment variables: Set in Netlify dashboard
```

**Backend Deployment (Render)**
```bash
# Build command: npm install
# Start command: npm start
# Root directory: Backend
# Environment variables: Set in Render dashboard
```

**Database (MongoDB Atlas)**
- Production cluster with appropriate tier
- Network access configured for cloud deployment (0.0.0.0/0)
- Database user with read/write permissions
- Connection string in MONGODB_URI environment variable

## Project Structure

```
Ideamagix/
├── Backend/
│   ├── server.js                    # Express server entry point
│   ├── config/
│   │   └── database.js              # MongoDB connection configuration
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── course.controller.js     # Course management
│   │   ├── lecture.controller.js    # Lecture operations
│   │   └── user.controller.js       # User management
│   ├── models/
│   │   ├── User.js                  # User schema (Admin, Instructor)
│   │   ├── Course.js                # Course schema with batches and lectures
│   │   └── Lecture.js               # Lecture schema (optional separate)
│   ├── routes/
│   │   ├── auth.routes.js           # Authentication routes
│   │   ├── course.routes.js         # Course routes
│   │   ├── lecture.routes.js        # Lecture routes
│   │   └── user.routes.js           # User routes
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT verification and role checking
│   ├── scripts/
│   │   └── seed.js                  # Database seeding script
│   └── .env                         # Environment variables
│
├── Frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── pages/
│   │   │   ├── admin/               # Admin pages
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── CoursesPage.jsx
│   │   │   │   ├── CourseBatchesPage.jsx
│   │   │   │   └── InstructorsPage.jsx
│   │   │   ├── instructor/          # Instructor pages
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   └── MyLecturesPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── InstructorLoginPage.jsx
│   │   │   └── InstructorSignupPage.jsx
│   │   ├── components/
│   │   │   ├── admin/               # Admin components
│   │   │   ├── layout/              # Layout components
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── DataContext.jsx      # Application data state
│   │   ├── utils/
│   │   │   └── api.js               # API service layer
│   │   └── .env                     # Environment variables
│   └── dist/                        # Production build
│
├── netlify.toml                     # Netlify deployment config
└── README.md
```

## Contributing Guidelines

![Contributing](https://img.shields.io/badge/Contributing-Welcome-brightgreen?style=for-the-badge&logo=git&logoColor=white)

### Development Workflow

1. **Repository Setup** - Fork the repository and clone to your local machine with `git clone`
2. **Branch Creation** - Create a feature branch from `main` with descriptive naming (`feature/add-email-notifications`, `fix/date-filtering-bug`)
3. **Environment Setup** - Follow installation instructions, configure environment variables, and verify both frontend and backend run successfully
4. **Code Implementation** - Implement changes following established patterns, JavaScript conventions, and React best practices
5. **Comprehensive Testing** - Test all features including authentication, course management, batch operations, lecture scheduling, and date-based filtering
6. **Code Quality** - Run ESLint, fix all warnings/errors, and maintain consistent code style
7. **Documentation Update** - Update relevant documentation for API changes, new features, or modified functionality
8. **Pull Request Submission** - Submit detailed PR with description, testing notes, screenshots, and breaking changes (if any)

### Code Standards

**JavaScript & React:**
- Use functional components with proper prop validation
- Follow React hooks best practices (dependency arrays, custom hooks)
- Use React.memo for performance-critical components
- Implement proper error boundaries for robust error handling
- Use consistent naming conventions (camelCase for variables, PascalCase for components)

**Backend & API:**
- Follow RESTful API design principles with proper HTTP methods
- Implement comprehensive input validation
- Use async/await for asynchronous operations with proper error handling
- Write modular, reusable controller functions
- Document API endpoints with request/response examples

**Styling & UI:**
- Use Tailwind CSS utility classes for styling
- Maintain mobile-first responsive design approach
- Ensure accessibility with ARIA attributes and semantic HTML
- Follow consistent spacing, typography, and color schemes

**Code Organization:**
- Keep components focused and single-responsibility
- Use custom hooks for reusable logic
- Implement proper separation of concerns (services, components, utils)
- Write self-documenting code with clear variable/function names
- Add comments for complex business logic

## Security Considerations

**Authentication & Authorization:**
- JWT tokens with secure secret keys and appropriate expiration (7 days)
- Bcrypt password hashing with sufficient salt rounds (10+)
- Role-based access control (RBAC) for admin and instructor endpoints
- Protected routes with authentication middleware
- Secure session management and token refresh mechanism

**Data Protection:**
- Input validation and sanitization on all endpoints
- NoSQL injection prevention with Mongoose
- XSS protection with React's built-in escaping
- CORS configuration with specific origin whitelisting
- Rate limiting to prevent brute force attacks (100 requests per 15 minutes)

**Infrastructure Security:**
- HTTPS enforcement in production (Netlify and Render provide SSL)
- Secure HTTP headers with appropriate configurations
- Environment variable protection (.env not in version control)
- Regular dependency updates for security patches
- Maximum file size validation (50MB) for image uploads

## Contact & Support

![Email](https://img.shields.io/badge/Email-yash3610%40example.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-yash3610-181717?style=for-the-badge&logo=github&logoColor=white)

**Technical Support & Collaboration**

For technical inquiries, feature requests, bug reports, or development collaboration:

- **GitHub Profile:** [yash3610](https://github.com/yash3610)
- **GitHub Issues:** [Create Issue](https://github.com/yash3610/Ideamagix/issues)
- **Repository:** [Ideamagix](https://github.com/yash3610/Ideamagix)
- **Live Demo:** [IDEAMAGIX - Online Lecture Scheduling System](https://ols-ideamagix-yash.netlify.app/)

## License & Usage Rights

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=opensource&logoColor=white)

**Usage Rights:** This project is open source and available under the MIT License. Feel free to use, modify, and distribute with proper attribution.

**Attribution Required:** Please credit the original author for any derivative works, academic references, or commercial implementations.

---

**IDEAMAGIX - Online Lecture Scheduling System** delivers a comprehensive, production-ready solution for modern educational institutions with role-based access control, intelligent date-based filtering, and enterprise-grade features. This full-stack application demonstrates expertise in React development, Node.js backend architecture, MongoDB database design, RESTful API development, and responsive UI/UX design with a focus on performance, security, scalability, and exceptional user experience across all touchpoints.

**🌐 Try it live:** [IDEAMAGIX - Online Lecture Scheduling System](https://ols-ideamagix-yash.netlify.app)

**⭐ Star this repository** if you find it helpful!

**Developed with ❤️ by Yash Hule (yash3610)**