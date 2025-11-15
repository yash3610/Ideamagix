import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Course from '../models/Course.js';

dotenv.config();

// Sample data
const adminUser = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'password123',
  role: 'admin'
};

const instructors = [
  {
    name: 'John Doe',
    email: 'instructor1@test.com',
    password: 'password123',
    role: 'instructor',
    mobile: '+1234567890',
    bio: 'Experienced instructor in web development',
    avatarUrl: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Jane Smith',
    email: 'instructor2@test.com',
    password: 'password123',
    role: 'instructor',
    mobile: '+1234567891',
    bio: 'Specialized in mobile app development',
    avatarUrl: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Robert Johnson',
    email: 'instructor3@test.com',
    password: 'password123',
    role: 'instructor',
    mobile: '+1234567892',
    bio: 'Database and backend expert',
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  },
  {
    name: 'Emily Davis',
    email: 'instructor4@test.com',
    password: 'password123',
    role: 'instructor',
    mobile: '+1234567893',
    bio: 'Frontend and UI/UX specialist',
    avatarUrl: 'https://i.pravatar.cc/150?img=4'
  },
  {
    name: 'Michael Wilson',
    email: 'instructor5@test.com',
    password: 'password123',
    role: 'instructor',
    mobile: '+1234567894',
    bio: 'Cloud computing and DevOps',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  }
];

const courses = [
  {
    name: 'Web Development Fundamentals',
    level: 'Beginner',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    imageUrl: 'https://picsum.photos/seed/web1/400/225',
    lectures: [
      { title: 'Introduction to HTML', date: new Date('2025-01-15'), duration: 60 },
      { title: 'CSS Basics', date: new Date('2025-01-16'), duration: 60 },
      { title: 'JavaScript Fundamentals', date: new Date('2025-01-17'), duration: 90 }
    ]
  },
  {
    name: 'Advanced React Development',
    level: 'Advanced',
    description: 'Master React with hooks, context, and advanced patterns',
    imageUrl: 'https://picsum.photos/seed/react1/400/225',
    lectures: [
      { title: 'React Hooks Deep Dive', date: new Date('2025-01-18'), duration: 120 },
      { title: 'Context API and State Management', date: new Date('2025-01-19'), duration: 90 },
      { title: 'Performance Optimization', date: new Date('2025-01-20'), duration: 90 }
    ]
  },
  {
    name: 'Node.js Backend Development',
    level: 'Intermediate',
    description: 'Build scalable backend applications with Node.js and Express',
    imageUrl: 'https://picsum.photos/seed/node1/400/225',
    lectures: [
      { title: 'Express.js Setup', date: new Date('2025-01-21'), duration: 60 },
      { title: 'RESTful APIs', date: new Date('2025-01-22'), duration: 90 },
      { title: 'Database Integration', date: new Date('2025-01-23'), duration: 120 }
    ]
  },
  {
    name: 'MongoDB Database Design',
    level: 'Intermediate',
    description: 'Learn NoSQL database design with MongoDB',
    imageUrl: 'https://picsum.photos/seed/mongo1/400/225',
    lectures: [
      { title: 'MongoDB Basics', date: new Date('2025-01-24'), duration: 60 },
      { title: 'Schema Design', date: new Date('2025-01-25'), duration: 90 },
      { title: 'Aggregation Framework', date: new Date('2025-01-26'), duration: 90 }
    ]
  },
  {
    name: 'Full Stack Development',
    level: 'Advanced',
    description: 'Complete full stack development with MERN stack',
    imageUrl: 'https://picsum.photos/seed/mern1/400/225',
    lectures: [
      { title: 'MERN Stack Overview', date: new Date('2025-01-27'), duration: 60 },
      { title: 'Building REST APIs', date: new Date('2025-01-28'), duration: 120 },
      { title: 'Authentication & Authorization', date: new Date('2025-01-29'), duration: 90 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create admin
    const admin = await User.create(adminUser);
    console.log('Admin created');

    // Create instructors
    const createdInstructors = await User.insertMany(instructors);
    console.log('Instructors created');

    // Create courses with lectures
    const createdCourses = [];
    for (const courseData of courses) {
      const course = await Course.create(courseData);
      createdCourses.push(course);
    }
    console.log('Courses created');

    // Assign some lectures to instructors (70% of lectures)
    for (const course of createdCourses) {
      for (let i = 0; i < course.lectures.length; i++) {
        if (Math.random() > 0.3) { // 70% chance
          const randomInstructor = createdInstructors[Math.floor(Math.random() * createdInstructors.length)];
          course.lectures[i].instructorId = randomInstructor._id;
        }
      }
      await course.save();
    }
    console.log('Lectures assigned to instructors');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin: admin@test.com / password123');
    console.log('Instructor: instructor1@test.com / password123');
    console.log('(instructor2-5 also available with same password)');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
