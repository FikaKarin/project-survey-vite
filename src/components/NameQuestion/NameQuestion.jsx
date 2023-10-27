import React from 'react';
import './style.css'

export default function NameQuestion({ onNameSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    // Regular expression to match letters, apostrophes, and hyphens
    const regex = /^[A-Za-z-' ]+$/;
    if (name.match(regex)) {
      onNameSubmit(name);
    } else {
      alert('Please enter a valid name containing only letters, apostrophes, and hyphens.');
    }
  };

  return (
    <div className='name-question'>
      <h3>What is your name?</h3>
      <form onSubmit={handleSubmit}>
        <input className='name-input' type='text' name='name' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
