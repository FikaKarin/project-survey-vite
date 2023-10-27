import React from 'react';
import './style.css';

export default function FollowUpQuestion({ question, answer, onAnswerChange }) {
  return (
    <div className='follow-up-question-container'>
      <label className='question-label'>{question}</label>
      <input
        className='input-field'
        type='text'
        value={answer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        required
      />
    </div>
  );
}
