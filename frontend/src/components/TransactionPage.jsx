import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import Navbar from './Navbar';
import axios from 'axios';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('http://localhost:3000/api/transactions/transactions')
      .then((response) => {
        // Set the fetched data to the state
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='container mx-auto p-4 flex items-center justify-center'>
        <div className='w-full'>
          <h1 className='text-3xl font-bold text-primary-700 mb-4'>
            All Transactions
          </h1>

          {transactions.length === 0 ? (
            <div className='bg-white rounded-md p-4 shadow-md w-full'>
              <h2 className='text-lg font-semibold text-gray-600 mb-2'>
                No Transactions Yet
              </h2>
            </div>
          ) : (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto'>
              {transactions.map((transaction, index) => (
                <TransactionItem key={index} transaction={transaction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
