import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';

// Chart.js setup
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      let incomeSum = 0;
      let expenseSum = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const amount = parseFloat(data.amount);
        if (data.transactionType === 'income') {
          incomeSum += amount;
        } else if (data.transactionType === 'expense') {
          expenseSum += amount;
        }
      });

      setIncomeTotal(incomeSum);
      setExpenseTotal(expenseSum);
    };

    fetchTransactions();
  }, []);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Financial Overview</h2>

      <div className="card-grid">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹ {incomeTotal.toLocaleString()}</p>
        </div>
        <div className="card expense">
          <h3>Total Expense</h3>
          <p>₹ {expenseTotal.toLocaleString()}</p>
        </div>
        <div className="card balance">
          <h3>Net Balance</h3>
          <p>₹ {balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <h3 className="chart-title">Income vs Expense</h3>
        <Pie
          data={{
            labels: ['Income', 'Expense'],
            datasets: [
              {
                label: '₹ Amount',
                data: [incomeTotal, expenseTotal],
                backgroundColor: ['#16a34a', '#dc2626'],
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
