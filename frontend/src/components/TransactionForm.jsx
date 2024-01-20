import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TransactionForm = () => {
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  // toast
  const notify = () =>
    toast.success('Transaction Completed', {
      autoClose: 3000,
      closeOnClick: true,
      theme: 'colored',
    });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (senderId) {
      // Fetch the selected sender's balance
      axios
        .get(`http://localhost:3000/api/users/users/${senderId}`)
        .then((response) => {
          setSelectedSender(response.data);
        })
        .catch((error) => {
          console.error('Error fetching sender details:', error);
        });
    } else {
      setSelectedSender(null);
    }
  }, [senderId]);

  useEffect(() => {
    if (receiverId) {
      // Fetch the selected receiver's balance
      axios
        .get(`http://localhost:3000/api/users/users/${receiverId}`)
        .then((response) => {
          setSelectedReceiver(response.data);
        })
        .catch((error) => {
          console.error('Error fetching receiver details:', error);
        });
    } else {
      setSelectedReceiver(null);
    }
  }, [receiverId]);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/api/users/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleTransaction = async (e) => {
    e.preventDefault();

    // Additional validation
    if (senderId === receiverId) {
      toast.error('Cannot send to the same person.');
      return;
    }

    if (Number(amount) <= 0) {
      toast.error('Amount must be greater than 0.');
      return;
    }

    if (Number(amount) > selectedSender.balance) {
      toast.error('Not sufficient balance to send')
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/transactions/transaction',
        {
          sender: senderId,
          receiver: receiverId,
          amount: Number(amount),
        }
      );

      console.log(response.data);

      notify();
      // navigate("/customers");
    } catch (error) {
      console.log('Error Came');
      console.error('Error:', error.response.data);
    }
  };

  // ... (previous code)

  return (
    <div>
      <Navbar />
      <div className='bg-background-50 h-screen'>
        <div className='container mx-auto p-4 text-text-900'>
          <h2 className='text-primary-color-2xl font-bold mb-4'>
            Transaction Form
          </h2>
          <form onSubmit={handleTransaction} className='space-y-4'>
            {/* Sender Section */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-600'>
                Sender ID
              </label>
              <select
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                className='mt-1 p-2 border rounded w-64' // Adjusted width
              >
                <option value=''>Select Sender</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.accountNumber} - {user.firstName}
                  </option>
                ))}
              </select>
              {selectedSender && (
                <div className='mt-2 text-sm text-gray-500'>
                  Sender Balance: {selectedSender.balance}
                </div>
              )}
            </div>

            {/* Receiver Section */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-600'>
                Receiver ID
              </label>
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className='mt-1 p-2 border rounded w-64' // Adjusted width
              >
                <option value=''>Select Receiver</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.accountNumber} - {user.firstName}
                  </option>
                ))}
              </select>
              {selectedReceiver && (
                <div className='mt-2 text-sm text-gray-500'>
                  Receiver Balance: {selectedReceiver.balance}
                </div>
              )}
            </div>

            {/* Amount Section */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-600'>
                Amount
              </label>
              <input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='mt-1 p-2 border rounded w-64' // Adjusted width
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='bg-primary-color-500 text-text-900 px-4 py-2 rounded hover:bg-primary-color-600 shadow-md w-64' // Adjusted width
              >
                Perform Transaction
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );

};

export default TransactionForm;
