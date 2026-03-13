import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Droplets, MapPin, Phone, Car, CheckCircle, Clock } from 'lucide-react';
import { apiCall } from '../../config/api';
import toast from 'react-hot-toast';

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  unassigned: 'bg-yellow-100 text-yellow-700',
  assigned: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
};

const WasherDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiCall('/subscriptions/my-jobs');
      setJobs(data);
    } catch (error) {
      toast.error('Failed to load jobs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const activeJobs = jobs.filter(j => j.status === 'assigned');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  const statCards = [
    { label: 'Total Jobs', value: jobs.length, icon: Droplets, color: 'text-blue-500' },
    { label: 'Active Jobs', value: activeJobs.length, icon: Clock, color: 'text-green-500' },
    { label: 'Completed', value: completedJobs.length, icon: CheckCircle, color: 'text-gray-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-10 w-10 opacity-70 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Jobs</CardTitle>
          <CardDescription>All car wash jobs currently assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Loading jobs…
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Droplets className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No jobs assigned yet</p>
              <p className="text-sm mt-1">The admin will assign jobs to you soon.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map(job => (
                <div key={job._id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{job.userName}</p>
                      <p className="text-sm text-muted-foreground">{job.planName} Plan</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{job.userPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{job.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-3.5 w-3.5 shrink-0" />
                      <span>{job.vehicleType}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <span className="text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString('en-IN')}
                    </span>
                    <span className="font-semibold text-primary text-sm">₹{job.planPrice}/month</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WasherDashboardPage;
