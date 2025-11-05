import React from 'react';
import './Card.css';

const Card = ({ children, className = '', onClick, ariaLabel }) => {
  const isInteractive = !!onClick;
  
  return (
    <div
      className={`card ${isInteractive ? 'card--interactive' : ''} ${className}`}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          onClick(e);
        }
      }}
    >
      {children}
    </div>
  );
};

export default Card;
