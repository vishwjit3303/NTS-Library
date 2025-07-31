import React, { useState } from 'react';

const EditRoleModal = ({ isOpen, user, onClose, onSubmit }) => {
  const [role, setRole] = useState(user?.role || 'Member');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user.id, role);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
   <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={onClose} role="button" aria-label="Close">×</span>
        <h3>Edit Role for {user.name}</h3>
        <form onSubmit={handleSubmit}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Member">Member</option>
          </select>
          <button type="submit">Update Role</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
