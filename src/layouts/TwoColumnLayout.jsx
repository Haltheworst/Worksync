import React from 'react';
import './TwoColumnLayout.css';

const TwoColumnLayout = ({ leftColumn, rightColumn }) => {
  return (
    <div className="two-column-layout">
      <div className="two-column-layout__left">
        {leftColumn}
      </div>
      <div className="two-column-layout__right">
        {rightColumn}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
