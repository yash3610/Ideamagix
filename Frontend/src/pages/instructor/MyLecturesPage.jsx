import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const MyLecturesPage = () => {
  const { user } = useAuth();
  const { getLecturesByInstructor } = useData();
  const [filter, setFilter] = useState('upcoming');

  const lectures = user ? getLecturesByInstructor(user.id) : [];
  
  const filteredLectures = lectures.filter(lecture => {
    const lectureDate = new Date(lecture.date);
    const today = new Date();
    today.setHours(0,0,0,0); // Compare dates only

    if (filter === 'upcoming') return lectureDate >= today;
    if (filter === 'completed') return lectureDate < today;
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle>My Lectures</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'upcoming' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('upcoming')}>Upcoming</Button>
          <Button variant={filter === 'completed' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('completed')}>Completed</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Course Name</th>
                <th scope="col" className="px-6 py-3">Lecture/Batch Title</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map(lecture => (
                <tr key={lecture.id} className="border-b">
                  <td className="px-6 py-4 font-medium">{lecture.courseName}</td>
                  <td className="px-6 py-4">{lecture.title}</td>
                  <td className="px-6 py-4">{new Date(lecture.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{lecture.duration} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLectures.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <p>No {filter} lectures found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyLecturesPage;
