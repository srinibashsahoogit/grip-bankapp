import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import your Navbar component here
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Throttle the function to execute only once per second
    const fetchCustomersThrottled = throttle(fetchCustomers, 1000);
    fetchCustomersThrottled();
  }, []);

  const fetchCustomers = () => {
    setIsFetching(true);
    axios
      .get('http://localhost:3000/api/users/users')
      .then((response) => {
        setCustomers(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setIsFetching(false);
      });
  };

  // Throttle function to control the execution rate
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  const toggleDetailedView = (customer) => {
    if (selectedCustomer && selectedCustomer._id === customer._id) {
      // Deselect the customer if it's already selected
      setSelectedCustomer(null);
    } else {
      // Select the clicked customer
      setSelectedCustomer(customer);
    }
  };

  return (
    <div className='bg-background-50 h-screen'>
      {/* Navbar */}
      <Navbar />

      {/* Customer List */}
      <div className='container mx-auto p-4 text-text-900'>
        <h1 className='text-primary-color-2xl font-bold mb-4'>Customers</h1>

        {/* List of Customers */}
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {customers.map((customer) => (
            <div
              key={customer._id}
              className={`bg-white p-4 rounded shadow cursor-pointer text-text-900 ${selectedCustomer && selectedCustomer._id === customer._id
                  ? 'border border-primary-color-500'
                  : ''
                }`}
              onClick={() => toggleDetailedView(customer)}
            >
              <h2 className='text-lg font-semibold mb-2'>
                {customer.firstName}
              </h2>
              {selectedCustomer && selectedCustomer._id === customer._id && (
                <>
                  <p className='text-sm text-gray-500'>
                    Email: {customer.email}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Account Balance: {customer.balance}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Account Number: {customer.accountNumber}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
