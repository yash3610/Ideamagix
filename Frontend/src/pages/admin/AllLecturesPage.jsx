import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';

const AllLecturesPage = () => {
  const { getAllLectures, getInstructorById } = useData();
  const allLectures = getAllLectures();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Lectures / Batches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Lecture Title</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {allLectures.map(lecture => {
                const instructor = lecture.instructorId ? getInstructorById(lecture.instructorId) : null;
                return (
                  <tr key={lecture.id} className="border-b">
                    <td className="px-6 py-4 font-medium">{lecture.title}</td>
                    <td className="px-6 py-4">{lecture.courseName}</td>
                    <td className="px-6 py-4">{new Date(lecture.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {instructor ? (
                        <div className="flex items-center gap-2">
                          <img src={instructor.avatarUrl} alt={instructor.name} className="h-6 w-6 rounded-full" />
                          {instructor.name}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllLecturesPage;
