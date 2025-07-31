import React, { useState } from 'react';

const ShareBookModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [bookLink, setBookLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user, bookLink);
    setBookLink('');
    onClose();
  };

  if (!isOpen) return null;

  return (
     <div className="modal-overlay">
      <div className="modal">
        <span className="close-icon" onClick={onClose} role="button" aria-label="Close">×</span>
        <h3 className="modal-title">Share Book with {user.name}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter book link or title"
            value={bookLink}
            onChange={(e) => setBookLink(e.target.value)}
            required
          />
          <button type="submit" className="modal-btn">📤 Share Book</button>
        </form>
      </div>
    </div>
  );
};

export default ShareBookModal;
