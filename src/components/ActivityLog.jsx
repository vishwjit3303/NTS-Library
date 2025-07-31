import React from 'react';
const ActivityLog = ({ activity }) => {
  return (
    <div className="activity-log-card">
      <h4>Recent Activity</h4>
      <ul>
        {activity.length === 0 && <li>No recent activity</li>}
        {activity.map((log, index) => (
          <li key={index}>
            <span className="log-icon">🕒</span>
            <span>{log.time} — {log.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
