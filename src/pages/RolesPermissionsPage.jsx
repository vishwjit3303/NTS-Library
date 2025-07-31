import React, { useState, useEffect } from 'react';
import UserManagement from '../components/UserManagement';
import RoleDistribution from '../components/RoleDistribution';
import ActivityLog from '../components/ActivityLog';

const RolesPermissionsPage = () => {
  // Load users from localStorage
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('nts_users');
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
      { id: 3, name: 'Claudia Brown', email: 'claudia@example.com', role: 'Member', status: 'Inactive' },
    ];
  });

  // Load activity log from localStorage
  const [activityLog, setActivityLog] = useState(() => {
    const storedLog = localStorage.getItem('nts_activity');
    return storedLog ? JSON.parse(storedLog) : [];
  });

  // Store updated users in localStorage
  useEffect(() => {
    localStorage.setItem('nts_users', JSON.stringify(users));
  }, [users]);

  // Store updated activity log in localStorage
  useEffect(() => {
    localStorage.setItem('nts_activity', JSON.stringify(activityLog));
  }, [activityLog]);

  // Logger function
  const logActivity = (message) => {
    const entry = {
      time: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      message
    };
    setActivityLog(prev => [entry, ...prev.slice(0, 9)]);
  };

  return (
    <div className="roles-container">
      <header className="roles-header">
        <h2>User Roles & Permissions</h2>
      </header>

      <div className="roles-content">
        <UserManagement users={users} setUsers={setUsers} logActivity={logActivity} />
        <div className="roles-sidebar">
          <RoleDistribution users={users} />
          <ActivityLog activity={activityLog} />
        </div>
      </div>

      <footer className="roles-footer">
        <div>
          <h4>NTS Digital Library</h4>
          <p>Stay updated!</p>
          <div className="subscribe">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <p>© 2025 NTS Digital Library</p>
      </footer>
    </div>
  );
};

export default RolesPermissionsPage;
