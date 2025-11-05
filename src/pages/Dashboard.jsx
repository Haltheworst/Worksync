import React from 'react';
import { Card } from '../components';
import './Dashboard.css';

const Dashboard = ({ userRole }) => {
  // Employee Dashboard (using data from SQL)
  if (userRole === 'employee') {
    return (
      <div className="dashboard">
        <h1 className="heading-xl">Dashboard</h1>
        
        <div className="dashboard__stats">
          <Card>
            <h3 className="secondary text-muted">Due Soon</h3>
            <p className="heading-xl">2</p>
            <p className="caption text-muted">Tasks due in next 3 days</p>
          </Card>
          
          <Card>
            <h3 className="secondary text-muted">Awaiting Review</h3>
            <p className="heading-xl">1</p>
            <p className="caption text-muted">Submissions pending review</p>
          </Card>
          
          <Card>
            <h3 className="secondary text-muted">Recent Comments</h3>
            <p className="heading-xl">3</p>
            <p className="caption text-muted">New comments on your work</p>
          </Card>
        </div>

        <section className="dashboard__activity">
          <h2 className="heading-l">Recent Activity</h2>
          <Card>
            <p className="body">Preity Sharma commented on your submission</p>
            <p className="caption text-muted">2 hours ago</p>
          </Card>
          <Card>
            <p className="body">Your submission for "Design Chatbot Architecture" was submitted</p>
            <p className="caption text-muted">1 day ago</p>
          </Card>
        </section>
      </div>
    );
  }

  // Manager Dashboard (using data from SQL)
  return (
    <div className="dashboard">
      <h1 className="heading-xl">Dashboard</h1>
      
      <div className="dashboard__stats">
        <Card>
          <h3 className="secondary text-muted">Active Projects</h3>
          <p className="heading-xl">2</p>
          <p className="caption text-muted">Ongoing projects</p>
        </Card>
        
        <Card className="card--danger">
          <h3 className="secondary text-muted">At-Risk Tasks</h3>
          <p className="heading-xl">1</p>
          <p className="caption text-muted">Pending tasks</p>
        </Card>
        
        <Card>
          <h3 className="secondary text-muted">Recent Submissions</h3>
          <p className="heading-xl">3</p>
          <p className="caption text-muted">Total submissions</p>
        </Card>
      </div>

      <section className="dashboard__actions">
        <h2 className="heading-l">Quick Actions</h2>
        <Card className="card--interactive">
          <p className="body">Review 2 pending submissions</p>
        </Card>
        <Card className="card--interactive">
          <p className="body">1 task is pending assignment</p>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
