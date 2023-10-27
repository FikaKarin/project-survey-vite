import React from 'react';
import './style.css';

export default function Summary({ name, answers }) {
  return (
    <div className='summary-container'>
        <div className='name-header'>
        <h2>Summary of Your Responses, </h2>
        <p>{name}</p>
      </div>
      <ul>
        {Object.entries(answers).map(([question, answer]) => (
          <li key={question}>
            <strong>{question}</strong>{' '}
            <p>{typeof answer === 'number' ? answer : String(answer)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
