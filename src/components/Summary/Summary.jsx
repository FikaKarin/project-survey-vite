import React from 'react';
import './style.css'

export default function Summary({ answers }) {
  return (
    <div className='summary-container'>
      <h2>Summary of Your Responses</h2>
      <ul>
        {Object.entries(answers).map(([question, answer]) => (
          <li key={question}>
            <strong>{question}</strong> <p>{answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

