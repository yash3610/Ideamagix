import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { CalendarCheck, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const InstructorDashboardPage = () => {
  const { user } = useAuth();
  const { getLecturesByInstructor } = useData();
  
  // ✅ CHANGED: user.id -> user._id || user.id
  const instructorId = user?._id || user?.id;
  const lectures = instructorId ? getLecturesByInstructor(instructorId) : [];
  const upcomingLectures = lectures.filter(l => new Date(l.date) >= new Date());

  return (
    <div>
      <Card className="mb-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <CardHeader>
          <CardTitle>Welcome back, {user?.name}!</CardTitle>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lectures Assigned</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lectures.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Lectures</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingLectures.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;