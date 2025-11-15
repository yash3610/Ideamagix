import React from 'react';
import { BookOpen, Users, CalendarClock, CalendarCheck } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import DashboardStatCard from '../../components/admin/DashboardStatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const AdminDashboardPage = () => {
  const { instructors, courses, getAllLectures } = useData();
  const navigate = useNavigate();

  const allLectures = getAllLectures();
  const upcomingLectures = allLectures.filter(l => new Date(l.date) >= new Date()).slice(0, 5);
  const recentCourses = courses.slice(-4);

  // Console log for debugging
  console.log('Dashboard Data:', {
    instructorCount: instructors.length,
    courseCount: courses.length,
    upcomingLectureCount: upcomingLectures.length,
    totalLectureCount: allLectures.length,
  });

  const stats = [
    { title: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-blue-500' },
    { title: 'Total Instructors', value: instructors.length, icon: Users, color: 'text-green-500' },
    { title: 'Upcoming Lectures', value: upcomingLectures.length, icon: CalendarClock, color: 'text-purple-500' },
    { title: 'Total Lectures', value: allLectures.length, icon: CalendarCheck, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>A quick look at the most recently added courses.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/courses')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentCourses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {recentCourses.map(course => {
                const courseId = course._id || course.id;
                return (
                  <div key={courseId} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={course.imageUrl} alt={course.name} className="h-16 w-16 object-cover rounded-md"/>
                      <div>
                        <p className="font-semibold">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.level}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/admin/courses/${courseId}`)}>
                      View
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No courses added yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Instructors</CardTitle>
              <CardDescription>List of all registered instructors.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/instructors')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {instructors.length > 0 ? (
            <div className="space-y-4">
              {instructors.slice(0, 5).map(instructor => {
                const instructorId = instructor._id || instructor.id;
                return (
                  <div key={instructorId} className="flex items-center gap-4 p-3 border rounded-lg">
                    {instructor.avatarUrl && (
                      <img src={instructor.avatarUrl} alt={instructor.name} className="h-12 w-12 rounded-full object-cover" />
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold">{instructor.name}</p>
                      <p className="text-sm text-muted-foreground">{instructor.email}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No instructors registered yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming Lectures</CardTitle>
              <CardDescription>Next 5 scheduled lectures.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/all-lectures')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingLectures.length > 0 ? (
            <div className="space-y-4">
              {upcomingLectures.map(lecture => {
                const lectureId = lecture._id || lecture.id;
                return (
                  <div key={lectureId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">{lecture.topic}</p>
                      <p className="text-sm text-muted-foreground">{lecture.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(lecture.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{lecture.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No upcoming lectures scheduled.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
