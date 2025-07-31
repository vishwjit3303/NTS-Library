import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, user, onConfirm }) => {
  if (!isOpen) return null;

  return (
     <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={onClose} role="button" aria-label="Close">×</span>
        <h3 className="modal-title">Delete User</h3>
        <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
        <button
          className="modal-btn"
          style={{ backgroundColor: '#dc2626' }}
          onClick={() => {
            onConfirm(user.id);
            onClose();
          }}
        >
          🗑️ Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
