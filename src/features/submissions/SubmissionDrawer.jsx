import React, { useState } from 'react';
import { Drawer, Button, Chip } from '../../components';
import CommentList from '../comments/CommentList';
import './SubmissionDrawer.css';

const SubmissionDrawer = ({ isOpen, onClose, submission, userRole }) => {
  const [status, setStatus] = useState(submission?.status || 'Submitted');

  if (!submission) return null;

  // Mock submission data from your SQL
  const submissionData = {
    801: {
      id: 801,
      task: 'Design Chatbot Architecture',
      fileName: 'chatbot_architecture.pdf',
      fileUrl: 'http://files.com/chatbot_architecture.pdf',
      submittedDate: '2025-02-15 10:30:00',
      status: 'Submitted'
    },
    802: {
      id: 802,
      task: 'Implement NLP Module',
      fileName: 'nlp_module.zip',
      fileUrl: 'http://files.com/nlp_module.zip',
      submittedDate: '2025-03-20 14:45:00',
      status: 'Reviewed'
    },
    803: {
      id: 803,
      task: 'Data Collection',
      fileName: 'risk_data.xlsx',
      fileUrl: 'http://files.com/risk_data.xlsx',
      submittedDate: '2025-04-10 09:15:00',
      status: 'Approved'
    }
  };

  const data = submissionData[submission.submissionId] || submissionData[801];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Submission for ${data.task}`}>
      <div className="submission-drawer">
        <div className="submission-drawer__file">
          <div className="submission-drawer__file-card">
            <span className="submission-drawer__file-icon">📄</span>
            <div>
              <p className="body">{data.fileName}</p>
              <Button variant="ghost" size="medium">Download</Button>
            </div>
          </div>
          <p className="caption text-muted">Submitted {data.submittedDate}</p>
          <Chip status={status} type="submission" />
        </div>

        {userRole === 'employee' && (
          <Button variant="secondary" size="large">Upload New Version</Button>
        )}

        {userRole === 'manager' && (
          <div className="submission-drawer__field">
            <label className="secondary">Change Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="submission-drawer__select"
            >
              <option>Submitted</option>
              <option>Reviewed</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        )}

        <div className="submission-drawer__comments">
          <h3 className="heading-l">Comments</h3>
          <CommentList submissionId={data.id} />
        </div>
      </div>
    </Drawer>
  );
};

export default SubmissionDrawer;
