import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';

const AllInstructorsPage = () => {
  const { instructors, courses } = useData();

  const getAssignedCourse = (instructorId) => {
    let assigned = null;
    courses.forEach((course) => {
      course.lectures.forEach(lecture => {
        if (lecture.instructorId === instructorId) {
          if (!assigned || lecture.date > assigned.lectureDate) {
            assigned = { courseName: course.name, lectureDate: lecture.date };
          }
        }
      });
    });
    return assigned;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Instructors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Instructor Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Assigned Course</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map(instructor => {
                const assignedInfo = getAssignedCourse(instructor.id);
                return (
                  <tr key={instructor.id} className="border-b">
                    <td className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-3">
                      <img src={instructor.avatarUrl} alt={instructor.name} className="h-8 w-8 rounded-full" />
                      {instructor.name}
                    </td>
                    <td className="px-6 py-4">{instructor.email}</td>
                    <td className="px-6 py-4">
                      {assignedInfo ? (
                        <div>
                          <p className="font-semibold">{assignedInfo.courseName}</p>
                          <p className="text-xs text-muted-foreground">Next on: {assignedInfo.lectureDate.toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not Assigned</span>
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

export default AllInstructorsPage;
