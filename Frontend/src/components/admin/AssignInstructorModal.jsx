import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import { useData } from '../../contexts/DataContext';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const AssignInstructorModal = ({ isOpen, onClose, course }) => {
  const { instructors, getUnassignedLectures, assignLecture, getAllLectures } = useData();
  
  const [selectedLectureId, setSelectedLectureId] = useState('');
  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [unassignedLectures, setUnassignedLectures] = useState([]);

  useEffect(() => {
    if (course) {
      setUnassignedLectures(getUnassignedLectures(course.id));
    }
  }, [course, getUnassignedLectures, isOpen]);


  const selectedLecture = useMemo(() => {
    return unassignedLectures.find(l => l.id === selectedLectureId);
  }, [selectedLectureId, unassignedLectures]);

  const handleAssign = () => {
    if (!selectedLectureId || !selectedInstructorId) {
      toast.error('Please select both a lecture and an instructor.');
      return;
    }

    const lectureDate = new Date(selectedLecture.date);
    const allLectures = getAllLectures();

    const hasConflict = allLectures.some(l => 
      l.instructorId === selectedInstructorId &&
      new Date(l.date).toDateString() === lectureDate.toDateString()
    );

    if (hasConflict) {
      toast.error('This instructor is already assigned another lecture on this date.');
      return;
    }

    assignLecture(selectedLecture.id, selectedLecture.courseId, selectedInstructorId);
    toast.success('Lecture assigned successfully!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Instructor to ${course.name}`}
      description="Select an unassigned batch and an instructor."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="lecture" className="text-sm font-medium">Select Unassigned Batch</label>
          <select
            id="lecture"
            value={selectedLectureId}
            onChange={(e) => setSelectedLectureId(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent"
          >
            <option value="">-- Select a Batch --</option>
            {unassignedLectures.map(lecture => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.title} ({new Date(lecture.date).toLocaleDateString()})
              </option>
            ))}
          </select>
           {unassignedLectures.length === 0 && <p className="text-xs text-muted-foreground">No unassigned batches for this course.</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="instructor" className="text-sm font-medium">Select Instructor</label>
          <select
            id="instructor"
            value={selectedInstructorId}
            onChange={(e) => setSelectedInstructorId(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent"
          >
            <option value="">-- Select an Instructor --</option>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>

        {selectedLecture && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold">Assignment Details</h4>
            <p className="text-sm"><strong>Lecture:</strong> {selectedLecture.title}</p>
            <p className="text-sm"><strong>Date:</strong> {new Date(selectedLecture.date).toLocaleDateString()}</p>
          </div>
        )}

        <Button onClick={handleAssign} className="w-full" disabled={!selectedLectureId || !selectedInstructorId}>
          Assign Instructor
        </Button>
      </div>
    </Modal>
  );
};

AssignInstructorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

export default AssignInstructorModal;
