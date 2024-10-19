"use client";

import React from 'react';

const RefreshBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition duration-300 w-full"
    >
      Refresh
    </button>
  );
};

export default RefreshBtn;
