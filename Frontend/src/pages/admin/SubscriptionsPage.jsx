import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DashboardStatCard from '../../components/admin/DashboardStatCard';
import { Eye, UserCheck, ClipboardList, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { apiCall } from '../../config/api';
import toast from 'react-hot-toast';

const TABS = ['All', 'New', 'Unassigned', 'Assigned'];
const STATUS_MAP = { All: '', New: 'new', Unassigned: 'unassigned', Assigned: 'assigned' };

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  unassigned: 'bg-yellow-100 text-yellow-700',
  assigned: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-700',
};

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedSub, setSelectedSub] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [washers, setWashers] = useState([]);
  const [selectedWasherId, setSelectedWasherId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiCall('/subscriptions');
      setSubscriptions(data);
    } catch (error) {
      toast.error('Failed to load subscriptions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWashers = useCallback(async () => {
    try {
      const data = await apiCall('/subscriptions/washers');
      setWashers(data);
    } catch (error) {
      console.error('Failed to load washers:', error);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
    fetchWashers();
  }, [fetchSubscriptions, fetchWashers]);

  const filteredSubscriptions = activeTab === 'All'
    ? subscriptions
    : subscriptions.filter(s => s.status === STATUS_MAP[activeTab]);

  const stats = [
    { title: 'Total Subscriptions', value: subscriptions.length, icon: ClipboardList, color: 'text-blue-500' },
    { title: 'New', value: subscriptions.filter(s => s.status === 'new').length, icon: Clock, color: 'text-purple-500' },
    { title: 'Unassigned', value: subscriptions.filter(s => s.status === 'unassigned').length, icon: AlertCircle, color: 'text-yellow-500' },
    { title: 'Assigned', value: subscriptions.filter(s => s.status === 'assigned').length, icon: CheckCircle, color: 'text-green-500' },
  ];

  const openDetails = (sub) => {
    setSelectedSub(sub);
    setSelectedWasherId('');
    setIsDetailOpen(true);
  };

  const handleOpenAssign = () => {
    setIsDetailOpen(false);
    setIsAssignOpen(true);
  };

  const handleAssignWasher = async () => {
    if (!selectedWasherId) {
      toast.error('Please select a washer');
      return;
    }
    try {
      setAssigning(true);
      const updated = await apiCall(`/subscriptions/${selectedSub._id}/assign-washer`, {
        method: 'PUT',
        body: JSON.stringify({ washerId: selectedWasherId }),
      });
      setSubscriptions(prev => prev.map(s => s._id === updated._id ? updated : s));
      setSelectedSub(updated);
      setIsAssignOpen(false);
      setSelectedWasherId('');
      toast.success('Washer assigned successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to assign washer');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <DashboardStatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Manage all customer subscription plans and washer assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b overflow-x-auto">
            {TABS.map(tab => {
              const count = tab === 'All' ? subscriptions.length : subscriptions.filter(s => s.status === STATUS_MAP[tab]).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  }`}
                >
                  {tab}
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Loading subscriptions…
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Plan</th>
                    <th className="px-6 py-3">Vehicle</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Washer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-muted-foreground">
                        No subscriptions found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscriptions.map(sub => (
                      <tr key={sub._id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium">{sub.userName}</p>
                          <p className="text-xs text-muted-foreground">{sub.userEmail}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{sub.planName}</p>
                          <p className="text-xs text-muted-foreground">₹{sub.planPrice}/month</p>
                        </td>
                        <td className="px-6 py-4">{sub.vehicleType}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[sub.status]}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {sub.washerName
                            ? <span className="text-sm">{sub.washerName}</span>
                            : <span className="text-muted-foreground text-xs">Not Assigned</span>
                          }
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(sub.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetails(sub)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Detail Modal */}
      {selectedSub && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title="Subscription Details"
          description={`Plan: ${selectedSub.planName} · Status: ${selectedSub.status}`}
        >
          <div className="space-y-4">
            {/* Customer Info */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Customer Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{selectedSub.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{selectedSub.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{selectedSub.userPhone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">Address</span>
                  <span className="font-medium text-right">{selectedSub.address}</span>
                </div>
              </div>
            </div>
            <hr />
            {/* Plan Info */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Plan Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{selectedSub.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">₹{selectedSub.planPrice}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">{selectedSub.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscribed On</span>
                  <span className="font-medium">
                    {new Date(selectedSub.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
            {/* Assigned Washer Info */}
            {selectedSub.washerName && (
              <>
                <hr />
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Assigned Washer
                  </h4>
                  <p className="text-sm font-medium">{selectedSub.washerName}</p>
                </div>
              </>
            )}
            {/* Assign Washer Button */}
            {selectedSub.status !== 'completed' && (
              <div className="pt-2">
                <Button onClick={handleOpenAssign} className="w-full flex items-center justify-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  {selectedSub.washerName ? 'Reassign Washer' : 'Assign Washer'}
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Assign Washer Modal */}
      {selectedSub && (
        <Modal
          isOpen={isAssignOpen}
          onClose={() => { setIsAssignOpen(false); setIsDetailOpen(true); }}
          title="Assign Washer"
          description={`Choose a washer for ${selectedSub.userName}'s ${selectedSub.planName} plan`}
        >
          <div className="space-y-4">
            {washers.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No washers available. Create washer accounts first.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {washers.map(washer => (
                  <label
                    key={washer._id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedWasherId === washer._id
                        ? 'border-primary bg-accent'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="washer"
                      value={washer._id}
                      checked={selectedWasherId === washer._id}
                      onChange={() => setSelectedWasherId(washer._id)}
                      className="h-4 w-4 accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium">{washer.name}</p>
                      <p className="text-xs text-muted-foreground">{washer.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => { setIsAssignOpen(false); setIsDetailOpen(true); }}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleAssignWasher}
                disabled={!selectedWasherId || assigning || washers.length === 0}
                className="flex-1"
              >
                {assigning ? 'Assigning…' : 'Confirm Assignment'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubscriptionsPage;
