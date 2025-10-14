import React from 'react';

function BtnBlack({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white text-sm font-medium border border-black cursor-pointer px-2 py-1 rounded hover:bg-gray-50 hover:text-black transition-all duration-300 shadow-lg"
    >
      {text}
    </button>
  );
}

export default BtnBlack;
