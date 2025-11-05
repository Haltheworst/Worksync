import React, { useState } from 'react';
import { DataTable, Button, TabBar, Chip } from '../components';
import TwoColumnLayout from '../layouts/TwoColumnLayout';
import './Projects.css';

const Projects = ({ userRole }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Data from your SQL database
  const projects = [
    {
      id: 501,
      title: 'AI Chatbot System',
      manager: 'Alice Johnson',
      startDate: '2025-02-01',
      endDate: '2025-07-30',
      tasks: 2,
      progress: 50 // 1 out of 2 tasks done
    },
    {
      id: 502,
      title: 'Risk Analysis Model',
      manager: 'Robert Smith',
      startDate: '2025-03-01',
      endDate: 'Ongoing',
      tasks: 1,
      progress: 100 // 1 out of 1 task done
    }
  ];

  const tasks = {
    501: [
      { 
        id: 601, 
        title: 'Design Chatbot Architecture', 
        dueDate: '2025-03-15', 
        status: 'Pending',
        description: 'Plan conversation flow & NLP modules'
      },
      { 
        id: 602, 
        title: 'Implement NLP Module', 
        dueDate: '2025-05-01', 
        status: 'In Progress',
        description: 'Develop core natural language processing'
      }
    ],
    502: [
      { 
        id: 603, 
        title: 'Data Collection', 
        dueDate: '2025-04-15', 
        status: 'Done',
        description: 'Gather financial data for risk model'
      }
    ]
  };

  const projectColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'manager', label: 'Manager', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date' },
    { key: 'tasks', label: '#Tasks' },
    { 
      key: 'progress', 
      label: 'Progress',
      render: (value) => (
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${value}%` }}></div>
        </div>
      )
    }
  ];

  const taskColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <Chip status={value} type="task" />
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'assignments', label: 'Assignments' }
  ];

  const leftColumn = (
    <div className="project-list">
      <div className="project-list__header">
        <h2 className="heading-l">Projects</h2>
        {userRole === 'manager' && (
          <Button variant="primary">Create Project</Button>
        )}
      </div>
      
      <DataTable
        columns={projectColumns}
        data={projects}
        onRowClick={setSelectedProject}
        searchable
        caption="List of all projects"
      />
    </div>
  );

  const rightColumn = selectedProject ? (
    <div className="project-detail">
      <h1 className="heading-xl">{selectedProject.title}</h1>
      <p className="body text-muted">Managed by {selectedProject.manager}</p>
      
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="project-detail__content">
        {activeTab === 'overview' && (
          <div>
            <div className="project-detail__dates">
              <p className="body">
                {selectedProject.startDate} - {selectedProject.endDate}
              </p>
            </div>
            <div className="project-detail__stats">
              <p className="body">{selectedProject.tasks} total tasks</p>
              <p className="body">{Math.round(selectedProject.tasks * selectedProject.progress / 100)} completed</p>
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <DataTable
            columns={taskColumns}
            data={tasks[selectedProject.id] || []}
            onRowClick={(task) => console.log('Open task drawer', task)}
            caption="Project tasks"
          />
        )}
      </div>
    </div>
  ) : (
    <div className="empty-state">
      <p className="empty-state__message">Select a project to view details</p>
    </div>
  );

  return <TwoColumnLayout leftColumn={leftColumn} rightColumn={rightColumn} />;
};

export default Projects;
