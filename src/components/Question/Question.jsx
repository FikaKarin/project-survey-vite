// Question.js
import React from 'react';
import './style.css';

export default function Question({ question, options, type, onSelect }) {
  const renderInput = () => {
    if (type === 'input') {
      return <input className="input-field" type="text" onChange={(e) => onSelect(e.target.value)} />;
    } else if (type === 'select') {
      return (
        <select onChange={(e) => onSelect(e.target.value)}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (type === 'radio') {
      return (
        <div>
          {options.map((option) => (
            <div className='radio' key={option}>
              <input type="radio" id={option} name="cssKnowledge" value={option} onChange={() => onSelect(option)} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="question-container">
      <label className='question-label'>{question}</label>
      {renderInput()}
    </div>
  );
}
