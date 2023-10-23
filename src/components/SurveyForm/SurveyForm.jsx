// SurveyForm.js
import React, { useState } from 'react';
import Question from '../Question/Question';
import Summary from '../Summary/Summary';
import './style.css';

export default function SurveyForm() {
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const questions = [
    {
      question: 'What is your favorite color?',
      type: 'select',
      options: ['Red', 'Blue', 'Green'],
    },
    {
      question: 'Which programming language do you prefer?',
      type: 'select',
      options: ['JavaScript', 'Python', 'Java'],
    },
    {
      question: 'How do you view your knowledge in CSS?',
      type: 'radio',
      options: [
        'Beginner',
        'I know the basics',
        'Getting the hang of it!',
        'I speak fluid CSS',
        "I'm a master!",
      ],
    },
    {
      question:
        'What do you like the most about working as a programmer, compared to previous jobs?',
      type: 'input',
    },
    { question: 'What´s the hardest about being a programmer?', type: 'input' },
    {
      question: 'Would you recommend programming as a profession?',
      type: 'input',
    },
    {
      question: 'Is there anything else you would like to add?',
      type: 'input',
    },
  ];

  const handleAnswerSelection = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  const handleSubmit = () => {
    setShowSummary(true);
  };

  return (
    <div className='form-container'>
      <header className='header'>
        <h1>Coder Survey</h1>
      </header>
      {!showSummary ? (
        <form className='form'>
          {questions.map(({ question, options, type }) => (
            <Question
              key={question}
              question={question}
              options={options}
              type={type}
              onSelect={(answer) => handleAnswerSelection(question, answer)}
            />
          ))}
          <button type='button' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      ) : (
        <Summary answers={answers} />
      )}
    </div>
  );
}
