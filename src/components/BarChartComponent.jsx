// src/components/BarChartComponent.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ transactions }) => {
  // Group transactions by category and sum their amounts
  const chartData = transactions.reduce((acc, txn) => {
    const found = acc.find(item => item.category === txn.category);
    if (found) {
      found.amount += Number(txn.amount);
    } else {
      acc.push({ category: txn.category, amount: Number(txn.amount) });
    }
    return acc;
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 100, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
