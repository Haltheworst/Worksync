import React, { useState } from 'react';
import { Drawer, Button, Chip, Avatar } from '../../components';
import './TaskDrawer.css';

const TaskDrawer = ({ isOpen, onClose, task, userRole }) => {
  const [status, setStatus] = useState(task?.status || 'Pending');

  if (!task) return null;

  // Assignments from your SQL database
  const taskAssignments = {
    601: [
      { id: 701, employee: 'Rajbir Biswas', assignedDate: '2025-02-10' }
    ],
    602: [
      { id: 702, employee: 'Preity Sharma', assignedDate: '2025-03-05' }
    ],
    603: [
      { id: 703, employee: 'Manish Kumar', assignedDate: '2025-03-20' }
    ]
  };

  const assignments = taskAssignments[task.id] || [];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={task.title}>
      <div className="task-drawer">
        <div className="task-drawer__field">
          <label className="secondary">Due Date</label>
          <input 
            type="date" 
            value={task.dueDate}
            disabled={userRole !== 'manager'}
            className="task-drawer__input"
          />
        </div>

        <div className="task-drawer__field">
          <label className="secondary">Status</label>
          {userRole === 'manager' ? (
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="task-drawer__select"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Blocked</option>
              <option>Done</option>
            </select>
          ) : (
            <Chip status={status} type="task" />
          )}
        </div>

        <div className="task-drawer__field">
          <label className="secondary">Description</label>
          <textarea 
            value={task.description || ''}
            disabled={userRole !== 'manager'}
            className="task-drawer__textarea"
            rows="4"
          />
        </div>

        <div className="task-drawer__field">
          <label className="secondary">Linked Project</label>
          <Chip status={task.project} type="task" />
        </div>

        <div className="task-drawer__section">
          <div className="task-drawer__section-header">
            <h3 className="heading-l">Assigned To</h3>
            {userRole === 'manager' && (
              <Button variant="primary" size="medium">+ Assign Employee</Button>
            )}
          </div>
          
          <div className="task-drawer__assignments">
            {assignments.map(assignment => (
              <div key={assignment.id} className="task-drawer__assignment">
                <Avatar name={assignment.employee} size="medium" />
                <div>
                  <p className="body">{assignment.employee}</p>
                  <p className="caption text-muted">Assigned {assignment.assignedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default TaskDrawer;
