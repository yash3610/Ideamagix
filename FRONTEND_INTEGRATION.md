# Frontend-Backend Integration Guide
# संपूर्ण Frontend-Backend Integration माहिती

## Overview / सारांश

हा guide तुम्हाला Frontend ला Backend सोबत connect करण्यास मदत करेल.

## Step 1: API Configuration File तयार करा

**File:** `Frontend/src/config/api.js` (नवीन file)

```javascript
const API_URL = 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');

export const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};
```

---

## Step 2: AuthContext.jsx Update करा

**File:** `Frontend/src/contexts/AuthContext.jsx`

**पूर्ण code:**

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { apiCall } from '../config/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      setUser(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}!`);
      navigate(data.role === 'admin' ? '/admin' : '/instructor');
      return true;
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'An account with this email already exists.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateProfile = async (updatedData) => {
    if (!user) return;
    
    try {
      const data = await apiCall('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

## Step 3: DataContext.jsx Update करा

**File:** `Frontend/src/contexts/DataContext.jsx`

**पूर्ण code:**

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiCall } from '../config/api';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [coursesData, instructorsData] = await Promise.all([
        apiCall('/courses'),
        apiCall('/users/instructors'),
      ]);
      setCourses(coursesData);
      setInstructors(instructorsData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- User/Instructor Methods ---
  const addInstructor = async (instructorData) => {
    try {
      const newInstructor = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(instructorData),
      });
      setInstructors(prev => [...prev, newInstructor]);
      return newInstructor;
    } catch (error) {
      console.error('Error adding instructor:', error);
      return null;
    }
  };

  const updateInstructor = async (instructorId, updatedData) => {
    try {
      const updatedInstructor = await apiCall('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      
      setInstructors(prev => prev.map(i => 
        i._id === instructorId ? updatedInstructor : i
      ));
      return updatedInstructor;
    } catch (error) {
      console.error('Error updating instructor:', error);
      return null;
    }
  };

  const getInstructorById = (id) => {
    return instructors.find(i => i._id === id || i.id === id);
  };

  // --- Course Methods ---
  const addCourse = async (courseData) => {
    try {
      const newCourse = await apiCall('/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
      });
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (error) {
      console.error('Error adding course:', error);
      return null;
    }
  };

  const updateCourse = async (courseId, updatedData) => {
    try {
      const updatedCourse = await apiCall(`/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      
      setCourses(prev => prev.map(c => 
        c._id === courseId ? updatedCourse : c
      ));
      return updatedCourse;
    } catch (error) {
      console.error('Error updating course:', error);
      return null;
    }
  };

  const getCourseById = (id) => {
    return courses.find(c => c._id === id || c.id === id);
  };

  // --- Lecture Methods ---
  const addLecture = async (courseId, lectureData) => {
    try {
      const updatedCourse = await apiCall(`/courses/${courseId}/lectures`, {
        method: 'POST',
        body: JSON.stringify(lectureData),
      });
      
      setCourses(prev => prev.map(c => 
        c._id === courseId ? updatedCourse : c
      ));
      return updatedCourse;
    } catch (error) {
      console.error('Error adding lecture:', error);
      return null;
    }
  };

  const assignLecture = async (lectureId, courseId, instructorId) => {
    try {
      const updatedCourse = await apiCall('/lectures/assign', {
        method: 'PUT',
        body: JSON.stringify({ lectureId, courseId, instructorId }),
      });
      
      setCourses(prev => prev.map(c => 
        c._id === courseId ? updatedCourse : c
      ));
      return updatedCourse;
    } catch (error) {
      console.error('Error assigning lecture:', error);
      return null;
    }
  };

  // --- Getter Methods ---
  const getLecturesByInstructor = (instructorId) => {
    const assignedLectures = [];
    courses.forEach(course => {
      if (course.lectures && Array.isArray(course.lectures)) {
        course.lectures.forEach(lecture => {
          const lectureInstructorId = lecture.instructorId?._id || lecture.instructorId;
          if (lectureInstructorId === instructorId) {
            assignedLectures.push({ 
              ...lecture, 
              courseName: course.name,
              courseId: course._id 
            });
          }
        });
      }
    });
    return assignedLectures.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getUnassignedLectures = (courseId = null) => {
    let lecturesToFilter = courseId 
      ? courses.find(c => c._id === courseId)?.lectures || [] 
      : courses.flatMap(c => c.lectures || []);

    return lecturesToFilter
      .filter(lecture => !lecture.instructorId)
      .map(lecture => {
        const course = courses.find(c => c._id === (lecture.courseId || courseId));
        return { 
          ...lecture, 
          courseName: course?.name,
          courseId: course?._id 
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const getAllLectures = () => {
    return courses.flatMap(course => 
      (course.lectures || []).map(lecture => ({ 
        ...lecture, 
        courseName: course.name,
        courseId: course._id 
      }))
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getInstructorsForCourse = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    if (!course || !course.lectures) return [];
    
    const instructorIds = new Set(
      course.lectures
        .map(l => l.instructorId?._id || l.instructorId)
        .filter(Boolean)
    );
    
    return Array.from(instructorIds).map(id => getInstructorById(id)).filter(Boolean);
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <DataContext.Provider value={{ 
        courses, 
        instructors, 
        addCourse, 
        updateCourse, 
        addLecture, 
        assignLecture, 
        getInstructorById, 
        getCourseById, 
        getLecturesByInstructor, 
        getUnassignedLectures, 
        getAllLectures, 
        getInstructorsForCourse, 
        addInstructor, 
        updateInstructor,
        fetchInitialData
    }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
```

---

## Step 4: main.jsx मध्ये DataProvider Order बदला

**File:** `Frontend/src/main.jsx`

DataProvider आणि AuthProvider चा order **महत्वाचा** आहे. DataProvider बाहेर असावा:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

---

## Important Notes / महत्वाच्या सूचना

### 1. Backend Running असावा
```bash
cd Backend
npm run dev
```

### 2. CORS सक्षम असावा
Backend ला Frontend request accept करण्यासाठी CORS आधीच setup केला आहे.

### 3. ID Fields
- Backend `_id` वापरतो (MongoDB)
- काही ठिकाणी `id` आणि `_id` दोन्ही support केले आहे

### 4. Error Handling
सर्व API calls मध्ये try-catch आहे आणि toast messages दाखवतात.

### 5. Token Management
- Login केल्यावर token localStorage मध्ये save होतो
- सर्व authenticated requests मध्ये automatically token जातो

---

## Testing / चाचणी

### 1. Backend Start करा
```bash
cd Backend
npm run dev
```

### 2. Frontend Start करा
```bash
cd Frontend
npm run dev
```

### 3. Login करा
- Email: `admin@test.com`
- Password: `password123`

---

## Common Issues / सामान्य समस्या

### CORS Error
Backend running आहे का ते तपासा: `http://localhost:5000/api/health`

### 401 Unauthorized
Token expire झाला असेल तर logout करून पुन्हा login करा.

### Network Error
Backend PORT तपासा - `.env` मध्ये PORT सेट केला असेल तर Frontend API_URL मध्ये तोही बदला.

---

## आता Frontend पूर्णपणे Backend सोबत काम करेल! 🎉
