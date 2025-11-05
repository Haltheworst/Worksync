import React, { useEffect } from 'react';
import './Drawer.css';

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose}></div>
      )}
      <div className={`drawer ${isOpen ? 'drawer--open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer__header">
          <h2 className="heading-l">{title}</h2>
          <button 
            className="drawer__close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>
        <div className="drawer__body">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
