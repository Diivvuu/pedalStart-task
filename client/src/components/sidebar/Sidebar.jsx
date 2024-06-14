import React, { useState } from 'react';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isSettingsDisabled = true; // Set to true to disable Settings link

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h5>{currentUser.username}</h5>
        </div>
        <ul>
          <li className="list-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="list-item">
            <Link
              to="/settings"
              className={isSettingsDisabled ? 'disabled' : ''}
              onClick={(e) => {
                if (isSettingsDisabled) {
                  e.preventDefault();
                }
              }}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleSidebar}>
        <div className={`bars ${isOpen ? 'open' : ''}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
