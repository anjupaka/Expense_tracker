import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Income = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'Cash',
    category: 'Salary',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'transactions'), {
        ...formData,
        transactionType: 'income',
        createdAt: new Date(),
      });
      alert('Income added!');
      setFormData({
        title: '',
        amount: '',
        type: 'Cash',
        category: 'Salary',
        description: '',
        date: '',
      });
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '400px' }}>
        <h1 style={{ textAlign: 'center' }}>💰 Add Income</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option>Cash</option>
            <option>Bank Transfer</option>
          </select>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Salary</option>
            <option>Freelance</option>
            <option>Investment</option>
          </select>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Income;
