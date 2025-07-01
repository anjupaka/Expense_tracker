import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditModal from '../components/EditModal';
import './Transactions.css';
import BarChartComponent from '../components/BarChartComponent';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch all transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  // Delete a transaction
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, 'transactions', id));
        setTransactions(transactions.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Error deleting transaction:", err);
      }
    }
  };

  // Start editing
  const startEditing = (item) => {
    setEditing(item.id);
    setEditForm({
      title: item.title,
      amount: item.amount,
      category: item.category,
      type: item.type,
      date: item.date,
      transactionType: item.transactionType
    });
  };

  // Track input changes
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Submit edit
  const handleEditSubmit = async () => {
    try {
      const docRef = doc(db, 'transactions', editing);
      await updateDoc(docRef, { ...editForm });
      setTransactions(transactions.map((item) => item.id === editing ? { ...item, ...editForm } : item));
      setEditing(null);
      alert('Transaction updated!');
    } catch (err) {
      console.error('Error updating:', err);
    }
  };

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">🧾 All Transactions</h2>

      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Transaction</th>
              <th>Amount (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className={item.transactionType}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.transactionType}</td>
                <td>{item.amount}</td>
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

      <div style={{ marginTop: '40px' }}>
        <h3 className="chart-heading">📊 Category-wise Transaction Summary</h3>
        <BarChartComponent transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;
