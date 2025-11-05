import React from 'react';
import './TabBar.css';

const TabBar = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="tab-bar" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          className={`tab-bar__item ${activeTab === tab.id ? 'tab-bar__item--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
