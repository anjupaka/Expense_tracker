// 📁 src/components/EditModal.jsx
import React from 'react';
import './EditModal.css';

const EditModal = ({ editForm, onChange, onSubmit, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Transaction</h3>
        <input
          name="title"
          value={editForm.title}
          onChange={onChange}
          placeholder="Title"
        />
        <input
          name="amount"
          value={editForm.amount}
          onChange={onChange}
          placeholder="Amount"
        />
        <input
          name="category"
          value={editForm.category}
          onChange={onChange}
          placeholder="Category"
        />
        <input
          name="type"
          value={editForm.type}
          onChange={onChange}
          placeholder="Type"
        />
        <input
          name="date"
          type="date"
          value={editForm.date}
          onChange={onChange}
        />
        <div className="modal-buttons">
          <button onClick={onSubmit}>💾 Save</button>
          <button onClick={onCancel}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
