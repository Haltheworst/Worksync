import React, { useState } from 'react';
import { Card, Button, TabBar } from '../components';
import TwoColumnLayout from '../layouts/TwoColumnLayout';
import './Workspaces.css';

const Workspaces = ({ userRole }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Data from your SQL database
  const workspaces = [
    {
      id: 101,
      title: 'AI Research Lab',
      description: 'Workspace for AI & ML research team',
      members: 2, // Rajbir and Preity
      createdBy: 'Rajbir Biswas',
      createdAt: '2025-01-15'
    },
    {
      id: 102,
      title: 'Finance Hub',
      description: 'Workspace for finance & trading analysis',
      members: 2, // Manish and Srijan
      createdBy: 'Manish Kumar',
      createdAt: '2025-03-10'
    }
  ];

  const announcements = {
    101: [
      {
        id: 2001,
        title: 'Kickoff Meeting',
        content: 'AI Project kickoff meeting scheduled on Feb 1, 2025.',
        postedBy: 'Rajbir Biswas',
        postedAt: '2025-02-01 09:00:00'
      }
    ],
    102: [
      {
        id: 2002,
        title: 'Finance Report Update',
        content: 'Q1 financial report will be published next week.',
        postedBy: 'Manish Kumar',
        postedAt: '2025-03-15 14:30:00'
      }
    ]
  };

  const members = {
    101: [
      { id: 1, name: 'Rajbir Biswas', role: 'Developer', joinDate: '2025-01-15' },
      { id: 2, name: 'Preity Sharma', role: 'Tester', joinDate: '2025-02-20' }
    ],
    102: [
      { id: 3, name: 'Manish Kumar', role: 'Analyst', joinDate: '2025-03-10' },
      { id: 4, name: 'Srijan Sen', role: 'Intern', joinDate: '2025-04-12' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'projects', label: 'Projects' },
    { id: 'members', label: 'Members' }
  ];

  const leftColumn = (
    <div className="workspace-list">
      <div className="workspace-list__header">
        <h2 className="heading-l">Workspaces</h2>
        {userRole === 'manager' && (
          <Button variant="primary">Create Workspace</Button>
        )}
      </div>
      
      {workspaces.map(workspace => (
        <Card
          key={workspace.id}
          onClick={() => setSelectedWorkspace(workspace)}
          className={selectedWorkspace?.id === workspace.id ? 'card--selected' : ''}
        >
          <h3 className="heading-l">{workspace.title}</h3>
          <p className="body workspace-list__description">{workspace.description}</p>
          <div className="workspace-list__meta">
            <span className="caption text-muted">👥 {workspace.members} members</span>
            <span className="caption text-muted">By {workspace.createdBy}</span>
          </div>
        </Card>
      ))}
    </div>
  );

  const rightColumn = selectedWorkspace ? (
    <div className="workspace-detail">
      <h1 className="heading-xl">{selectedWorkspace.title}</h1>
      
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="workspace-detail__content">
        {activeTab === 'overview' && (
          <div>
            <p className="body">{selectedWorkspace.description}</p>
            <div className="workspace-detail__stats">
              <div>
                <p className="heading-l">2</p>
                <p className="secondary text-muted">Projects</p>
              </div>
              <div>
                <p className="heading-l">6</p>
                <p className="secondary text-muted">Tasks</p>
              </div>
              <div>
                <p className="heading-l">{selectedWorkspace.members}</p>
                <p className="secondary text-muted">Members</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'announcements' && (
          <div>
            {announcements[selectedWorkspace.id]?.map(announcement => (
              <Card key={announcement.id} className="announcement-card">
                <h3 className="heading-l">{announcement.title}</h3>
                <p className="body">{announcement.content}</p>
                <div className="workspace-list__meta">
                  <span className="caption text-muted">Posted by {announcement.postedBy}</span>
                  <span className="caption text-muted">{announcement.postedAt}</span>
                </div>
              </Card>
            )) || (
              <div className="empty-state">
                <p className="empty-state__message">No announcements yet.</p>
                {userRole === 'manager' && (
                  <Button variant="primary">New Announcement</Button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            {members[selectedWorkspace.id]?.map(member => (
              <Card key={member.id} className="member-card">
                <h3 className="body">{member.name}</h3>
                <p className="secondary text-muted">{member.role}</p>
                <p className="caption text-muted">Joined: {member.joinDate}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="empty-state">
      <p className="empty-state__message">Select a workspace to view details</p>
    </div>
  );

  return <TwoColumnLayout leftColumn={leftColumn} rightColumn={rightColumn} />;
};

export default Workspaces;
  