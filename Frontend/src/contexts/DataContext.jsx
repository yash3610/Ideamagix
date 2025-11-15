import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { courses as initialCourses, instructors as initialInstructors, admins } from '../utils/data';
import { faker } from '@faker-js/faker';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [instructors, setInstructors] = useState(initialInstructors);

  // --- User/Instructor Methods ---
  const addInstructor = (instructorData) => {
    const existing = instructors.find(i => i.email === instructorData.email);
    if (existing) return null;

    const newInstructor = {
      ...instructorData,
      id: faker.string.uuid(),
      role: 'instructor',
    };
    setInstructors(prev => [...prev, newInstructor]);
    return newInstructor;
  };

  const updateInstructor = (instructorId, updatedData) => {
    let updatedInstructor = null;
    setInstructors(prev => prev.map(i => {
      if (i.id === instructorId) {
        updatedInstructor = { ...i, ...updatedData };
        return updatedInstructor;
      }
      return i;
    }));
    return updatedInstructor;
  };

  const findUserByCredentials = (email, password) => {
    const allUsers = [...instructors, ...admins];
    return allUsers.find(u => u.email === email && u.password === password);
  };
  
  const getUserById = (id) => {
    const allUsers = [...instructors, ...admins];
    return allUsers.find(u => u.id === id);
  };

  // --- Course Methods ---
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: faker.string.uuid(),
      lectures: [],
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (courseId, updatedData) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updatedData } : c));
  };

  // --- Lecture Methods ---
  const addLecture = (courseId, lectureData) => {
    const newLecture = {
      ...lectureData,
      id: faker.string.uuid(),
      courseId,
    };
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, lectures: [...c.lectures, newLecture] } : c));
  };

  const assignLecture = (lectureId, courseId, instructorId) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, lectures: c.lectures.map(l => l.id === lectureId ? { ...l, instructorId } : l) }
        : c
    ));
  };

  // --- Getter Methods ---
  const getInstructorById = (id) => instructors.find(i => i.id === id);
  const getCourseById = (id) => courses.find(c => c.id === id);

  const getLecturesByInstructor = (instructorId) => {
    const assignedLectures = [];
    courses.forEach(course => {
      course.lectures.forEach(lecture => {
        if (lecture.instructorId === instructorId) {
          assignedLectures.push({ ...lecture, courseName: course.name });
        }
      });
    });
    return assignedLectures.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getUnassignedLectures = (courseId = null) => {
    let lecturesToFilter = courseId 
      ? courses.find(c => c.id === courseId)?.lectures || [] 
      : courses.flatMap(c => c.lectures);

    return lecturesToFilter
      .filter(lecture => !lecture.instructorId)
      .map(lecture => {
        const courseName = courseId ? courses.find(c => c.id === courseId).name : courses.find(c => c.id === lecture.courseId).name;
        return { ...lecture, courseName };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const getAllLectures = () => {
    return courses.flatMap(course => 
      course.lectures.map(lecture => ({ ...lecture, courseName: course.name }))
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getInstructorsForCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return [];
    const instructorIds = new Set(course.lectures.map(l => l.instructorId).filter(Boolean));
    return Array.from(instructorIds).map(id => getInstructorById(id));
  };

  return (
    <DataContext.Provider value={{ 
        courses, instructors, addCourse, updateCourse, addLecture, assignLecture, 
        getInstructorById, getCourseById, getLecturesByInstructor, getUnassignedLectures, 
        getAllLectures, getInstructorsForCourse, addInstructor, updateInstructor, 
        findUserByCredentials, getUserById 
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
