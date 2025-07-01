import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditModal from '../components/EditModal';
import './ExpenseHistory.css';

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const data = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.transactionType === 'expense');
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, 'transactions', id));
        setExpenses(expenses.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Error deleting transaction:", err);
      }
    }
  };

  const startEditing = (item) => {
    setEditing(item.id);
    setEditForm({
      title: item.title,
      amount: item.amount,
      category: item.category,
      type: item.type,
      date: item.date,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const docRef = doc(db, 'transactions', editing);
      await updateDoc(docRef, { ...editForm });
      setExpenses(expenses.map((item) => item.id === editing ? { ...item, ...editForm } : item));
      setEditing(null);
      alert('Transaction updated!');
    } catch (err) {
      console.error('Error updating:', err);
    }
  };

  return (
    <div className="expense-history-container">
      <h2 className="expense-heading">💸 Expense Transactions</h2>
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>₹ {item.amount}</td>
                <td>
                  <button onClick={() => startEditing(item)} className="edit-btn">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal
          editForm={editForm}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default ExpenseHistory;
