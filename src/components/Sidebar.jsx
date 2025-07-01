import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/transactions', label: 'Transactions' },
    { path: '/dashboard/income-history', label: 'Income History' },
    { path: '/dashboard/expense-history', label: 'Expense History' },
    { path: '/dashboard/income', label: 'Income' },
    { path: '/dashboard/expense', label: 'Expense' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload(); // This refreshes App.jsx to redirect back to Login
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="logo">EXPENSE TRACKER</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li>
          <button onClick={handleLogout} className="logout-button">
            🔓 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
