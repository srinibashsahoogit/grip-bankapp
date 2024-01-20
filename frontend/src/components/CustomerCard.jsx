// components/CustomerCard.js
import React from 'react';

const CustomerCard = ({ name, feedback }) => {
  return (
    <div className='max-w-xs mx-auto bg-white shadow-lg rounded-md overflow-hidden'>
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>{name}</h3>
        <p className='text-gray-600 mb-4'>{feedback}</p>
      </div>
      <div className='bg-gray-100 p-4 flex justify-end items-center'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
          View Details
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
