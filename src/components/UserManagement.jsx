import React, { useEffect, useState } from 'react';
import AddUserModal from './AddUserModal';
import ShareBookModal from './ShareBookModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditRoleModal from './EditRoleModal'; // ✅ New Modal

const UserManagement = ({ users, setUsers, logActivity }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [shareUser, setShareUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editUser, setEditUser] = useState(null); // ✅ For role editing

  // ✅ Add new user
  const handleAddUser = (newUser) => {
    const newUserData = {
      ...newUser,
      id: Date.now(),
      role: newUser.role || 'Member',
      status: 'Inactive',
    };
    setUsers(prev => [...prev, newUserData]);
    logActivity?.(`🟢 Added user ${newUserData.name} as ${newUserData.role}`);
  };

  // ✅ Delete user
  const confirmDelete = (id) => {
    const userToDelete = users.find(u => u.id === id);
    setUsers(prev => prev.filter(user => user.id !== id));
    logActivity?.(`🔴 Deleted user ${userToDelete.name}`);
  };

  // ✅ Share book
  const submitShare = (user, bookLink) => {
    const msg = `📤 Shared book "${bookLink}" with ${user.name}`;
    alert(msg);
    logActivity?.(msg);
  };

  // ✅ Edit role
  const handleRoleUpdate = (id, newRole) => {
    setUsers(prev =>
      prev.map(user => user.id === id ? { ...user, role: newRole } : user)
    );
    const updatedUser = users.find(u => u.id === id);
    logActivity?.(`✏️ Changed role of ${updatedUser.name} to ${newRole}`);
  };

  // ✅ Simulate Active/Inactive status every 10 sec
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/online-users')
        .then(res => res.json())
        .then(onlineUserIds => {
          setUsers(prev =>
            prev.map(user => ({
              ...user,
              status: onlineUserIds.includes(user.id) ? 'Active' : 'Inactive',
            }))
          );
        })
        .catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, [setUsers]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-card">
      {/* Header */}
      <div className="user-card-header">
        <div className="header-text">
          <h3>Manage Users</h3>
          <p>Overview of all users and their assigned roles and permissions.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="user-toolbar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="export-btn" onClick={() => {
          const headers = ['Name', 'Email', 'Role', 'Status'];
          const rows = users.map(u => [u.name, u.email, u.role, u.status]);
          const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'users.csv';
          link.click();
        }}>
          📤 Export
        </button>
        <button className="add-btn" onClick={() => setModalOpen(true)}>➕ Add User</button>
      </div>

      {/* Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge badge-${user.role?.toLowerCase() || 'member'}`}>{user.role}</span>
              </td>
              <td>
                <span className={`badge ${user.status?.toLowerCase() || 'inactive'}`}>{user.status}</span>
              </td>
              <td>
                <div className="action-menu-wrapper">
                  <button className="edit-btn" onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}>⋮</button>
                  {activeMenu === user.id && (
                    <div className="action-menu">
                      <button onClick={() => { setShareUser(user); setActiveMenu(null); }}>📤 Share Book</button>
                      <button onClick={() => { setDeleteUser(user); setActiveMenu(null); }}>🗑️ Delete</button>
                      <button onClick={() => { setEditUser(user); setActiveMenu(null); }}>✏️ Edit Role</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <AddUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddUser}
      />
      <ShareBookModal
        isOpen={!!shareUser}
        user={shareUser}
        onClose={() => setShareUser(null)}
        onSubmit={submitShare}
      />
      <DeleteConfirmModal
        isOpen={!!deleteUser}
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={(id) => confirmDelete(id)}
      />
      <EditRoleModal
        isOpen={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
        onSubmit={handleRoleUpdate}
      />
    </div>
  );
};

export default UserManagement;
