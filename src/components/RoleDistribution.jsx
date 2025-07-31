import React from 'react';

const RoleDistribution = ({ users }) => {
  // Count users by role
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const total = users.length || 1; // prevent divide by zero

  return (
    <div className="role-dist-card">
      <h4>Role Distribution</h4>
      {Object.entries(roleCounts).map(([role, count]) => {
        const percentage = Math.round((count / total) * 100);

        return (
          <div key={role} className="role-bar">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{role}</span>
              <span>{percentage}%</span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${percentage}%`,
                  background:
                    role.toLowerCase() === 'admin' ? '#dc2626' :
                    role.toLowerCase() === 'editor' ? '#facc15' :
                    '#3b82f6'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoleDistribution;
