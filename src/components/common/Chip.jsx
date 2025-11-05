import React from 'react';
import './Chip.css';

const Chip = ({ status, type = 'task' }) => {
  const getVariant = () => {
    if (type === 'task') {
      switch (status) {
        case 'Pending': return 'warning';
        case 'In Progress': return 'primary';
        case 'Blocked': return 'danger';
        case 'Done': return 'success';
        default: return 'primary';
      }
    } else if (type === 'submission') {
      switch (status) {
        case 'Submitted': return 'primary';
        case 'Reviewed': return 'warning';
        case 'Approved': return 'success';
        case 'Rejected': return 'danger';
        default: return 'primary';
      }
    }
  };

  const variant = getVariant();

  return (
    <span 
      className={`chip chip--${variant}`}
      role="status"
      aria-label={`${type} status: ${status}`}
    >
      {status}
    </span>
  );
};

export default Chip;
