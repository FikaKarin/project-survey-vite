import React, { useState, useEffect } from 'react';
import './style.css';

export default function Question({
  question,
  options,
  type,
  min,
  max,
  condition,
  onSelect,
  followUpQuestion, // receive followUpQuestion as a prop
}) {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSelect(value);
  };

  // Reset input value whenever the question or followUpQuestion changes
  useEffect(() => {
    setInputValue('');
  }, [question, followUpQuestion]);

  const renderInput = () => {
    if (type === 'input') {
      return (
        <input
          className='input-field'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
        />
      );
    } else if (type === 'select') {
      return (
        <select onChange={(e) => onSelect(e.target.value)}>
          <option value=''>Select an option</option>
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
              <input
                type='radio'
                id={option}
                name='cssKnowledge'
                value={option}
                onChange={() => onSelect(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      );
    } else if (type === 'range') {
      return (
        <div className='range-container'>
          <input
            className='range-field'
            type='range'
            min={1} // Change min value to 0
            max={10}
            step={1}
            onChange={(e) => onSelect(parseInt(e.target.value))}
          />
          <div className='range-labels'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='question-container'>
      <label className='question-label'>{question}</label>
      {renderInput()}
    </div>
  );
}
