import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  activeView: string;
  onViewChange: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, onClose }) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/' },
    { id: 'launches', label: 'Lançamentos', icon: '🚀', path: '/launches' }
  ];

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>SpaceX</h2>
        <span className="sidebar-subtitle">Mission Control</span>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li key={item.id} className="sidebar-item">
            <Link
              to={item.path}
              className={`sidebar-button ${activeView === item.id ? 'active' : ''}`}
              onClick={onViewChange}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;