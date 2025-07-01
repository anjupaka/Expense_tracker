import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';

import Dashboard from '../pages/Dashboard';
import Income from '../pages/Income';
import Expense from '../pages/Expense';
import IncomeHistory from '../pages/IncomeHistory';
import ExpenseHistory from '../pages/ExpenseHistory';
import Transactions from '../pages/Transactions';

const Tracker = ({ user }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '30px' }}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="income" element={<Income user={user} />} />
          <Route path="expense" element={<Expense user={user} />} />
          <Route path="income-history" element={<IncomeHistory user={user} />} />
          <Route path="expense-history" element={<ExpenseHistory user={user} />} />
          <Route path="transactions" element={<Transactions user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Tracker;
