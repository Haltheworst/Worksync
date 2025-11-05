import React from 'react';
import './Avatar.css';

const Avatar = ({ name, size = 'medium', src }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`avatar avatar--${size}`} aria-label={`${name}'s avatar`}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className="avatar__initials">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
