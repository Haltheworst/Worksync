import React, { useState } from 'react';
import { DataTable, Chip, Button } from '../components';
import './MyWork.css';

const MyWork = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Data from your SQL database (for Rajbir Biswas - Employee_ID: 1)
  const assignments = [
    {
      id: 701,
      task: 'Design Chatbot Architecture',
      project: 'AI Chatbot System',
      dueDate: '2025-03-15',
      taskStatus: 'Pending',
      submissionStatus: 'Submitted',
      submissionId: 801
    },
    // For Preity Sharma (Employee_ID: 2)
    {
      id: 702,
      task: 'Implement NLP Module',
      project: 'AI Chatbot System',
      dueDate: '2025-05-01',
      taskStatus: 'In Progress',
      submissionStatus: 'Reviewed',
      submissionId: 802
    },
    // For Manish Kumar (Employee_ID: 3)
    {
      id: 703,
      task: 'Data Collection',
      project: 'Risk Analysis Model',
      dueDate: '2025-04-15',
      taskStatus: 'Done',
      submissionStatus: 'Approved',
      submissionId: 803
    }
  ];

  const columns = [
    { key: 'task', label: 'Task', sortable: true },
    { key: 'project', label: 'Project', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { 
      key: 'taskStatus', 
      label: 'Task Status',
      render: (value) => <Chip status={value} type="task" />
    },
    { 
      key: 'submissionStatus', 
      label: 'Submission Status',
      render: (value) => value ? <Chip status={value} type="submission" /> : <span className="text-muted">-</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button 
          variant="ghost" 
          size="medium"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Upload/Update', row);
          }}
        >
          {row.submissionStatus ? 'Update' : 'Upload'}
        </Button>
      )
    }
  ];

  return (
    <div className="my-work">
      <h1 className="heading-xl">My Work</h1>
      
      <DataTable
        columns={columns}
        data={assignments}
        onRowClick={setSelectedSubmission}
        searchable
        caption="Your assigned tasks"
        emptyMessage="You have no assignments yet. Check back soon!"
      />
    </div>
  );
};

export default MyWork;
