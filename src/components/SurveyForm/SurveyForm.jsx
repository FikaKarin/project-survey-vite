import React, { useState } from 'react';
import Question from '../Question/Question';
import Summary from '../Summary/Summary';
import FollowUpQuestion from '../FollowUpQuestion/FollowUpQuestion';
import NameQuestion from '../NameQuestion/NameQuestion'
import './style.css';

export default function SurveyForm() {
  const [name, setName] = useState('');
  const [showNameQuestion, setShowNameQuestion] = useState(true);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false); // New state to control Summary display
  const [validationError, setValidationError] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  
  const handleNameSubmit = (userName) => {
    setName(userName);
    setShowNameQuestion(false); // Hide NameQuestion component after submission
  };

  const [questions, setQuestions] = useState([
    {
      question: 'What´s your prefered work setting?',
      type: 'select',
      options: ['Remote', 'Office', 'Hybrid'],
      condition: {
        Remote: 'What do you like the most about working remote?',
        Office: 'What do you like the most about working om site?',
        Hybrid: 'What do you like the most about working hybrid?',
      },
      followUp: 1,
    },
    {
      question: 'Which programming language do you prefer?',
      type: 'select',
      options: ['JavaScript', 'Python', 'Java'],
      condition: {
        JavaScript: 'What is your favorite JavaScript framework or library?',
        Python:
          'What do you use Python for the most (e.g., web development, data science)?',
        Java: 'Do you use Java for Android app development or other purposes?',
      },
      followUp: 1,
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
      condition: {
        'Getting the hang of it!':
          'What specific CSS concepts do you find challenging?',
        "I'm a master!": 'Can you share your experience in mastering CSS?',
      },
      followUp: 1,
    },
    {
      question:
        'What do you like the most about working as a programmer, compared to previous jobs?',
      type: 'input',
      followUp: null,
    },
    {
      question: 'What´s the hardest about being a programmer?',
      type: 'input',
      followUp: null,
    },
    {
      question: 'Would you recommend programming as a profession?',
      type: 'input',
      followUp: null,
    },
    {
      question:
        'On a scale of 1 to 10, how satisfied are you with your programming skills?',
      type: 'range', // Adding a range type question
      min: 1, // Minimum value for the range
      max: 10, // Maximum value for the range,
      followUp: null,
    },
    {
      question: 'How do you view your knowledge in JavaScript?',
      type: 'radio',
      options: ['Beginner', 'Intermediate', 'Advanced'],
      condition: {
        Advanced: 'Which JavaScript framework/library do you prefer?',
        Intermediate:
          'What kind of projects have you worked on with JavaScript?',
      },
      followUp: 1,
    },
    {
      question: 'What is your favorite programming book?',
      type: 'input',
      followUp: null,
    },
    {
      question: 'Is there anything else you would like to add?',
      type: 'input',
      followUp: null,
    },
  ]);

  const handleAnswerSelection = (answer) => {
    const currentQuestion = questions[step];
    const { condition } = currentQuestion;
    let followUpQuestion = null;

    // Update the answer in the answers state
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.question]: answer,
    }));

    if (condition && condition[answer]) {
      followUpQuestion = condition[answer];

      if (!answers[followUpQuestion]) {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [followUpQuestion]: '',
        }));
      }
    }

    setFollowUpQuestion(followUpQuestion);
    setAnswerSelected(true);
  };

  const getNextStep = () => {
    let nextStep = step + 1;
    let followUpQuestion = null;

    const userAnswer = answers[questions[step].question]; // Use 'step' instead of 'currentStep'
    console.log('User Answer:', userAnswer);

    if (questions[step].condition && userAnswer in questions[step].condition) {
      followUpQuestion = questions[step].condition[userAnswer];
      console.log('Follow-Up Question Text:', followUpQuestion);

      for (let i = 0; i < questions.length; i++) {
        console.log('Comparing with question:', questions[i].question);
        if (
          questions[i].question.trim().toLowerCase() ===
          followUpQuestion.trim().toLowerCase()
        ) {
          console.log('Match found at index:', i);
          followUpQuestion = followUpQuestion.trim().toLowerCase();
          nextStep = i;
          break;
        }
      }

      console.log('Follow-Up Question Index:', nextStep);
      console.log(followUpQuestion);
    } else {
      console.log('No follow-up question found.');
    }
    if (nextStep >= questions.length) {
      console.log('Reached the end of the questions.');
      return nextStep - 1; // or handle the end condition as per your requirement
    }

    return nextStep;
  };

  const handleContinue = () => {
    const currentQuestion = questions[step];
    const currentAnswer = answers[currentQuestion.question];
  
    if (!currentQuestion) {
      console.error('Error: Current question is undefined.');
      return;
    }
  
    if (currentQuestion.type === 'input' && (!currentAnswer || !currentAnswer.trim())) {
      setValidationError('Please answer the question to continue.');
      return;
    }
  
    const followUpQuestion = currentQuestion.condition ? currentQuestion.condition[currentAnswer] : null;
  
    if (followUpQuestion && (!answers[followUpQuestion] || !answers[followUpQuestion].trim())) {
      setValidationError('Please answer the follow-up question to continue.');
      return;
    }
  
    if (!answerSelected) {
      setValidationError('Please select an answer to continue.');
      return;
    }
  
    if (!currentQuestion) {
      console.error('Error: Current question is undefined.');
      return;
    }
  
    setSlideUp(true);
  
    setTimeout(() => {
      if (step === questions.length - 1) {
        const { [currentQuestion.question]: lastQuestion, ...otherAnswers } = answers;
        setShowSummary(true);
        setAnswers(otherAnswers);
      } else {
        const nextStep = getNextStep();
        setValidationError('');
        setAnswerSelected(false);
        setStep(nextStep);
        setFollowUpQuestion(null);
      }

      setSlideUp(false);
    }, 300);
  };
    
  console.log(followUpQuestion);

  return (
    <div className='form-container'>
      <header className='header'>
        <h1>Coder Survey</h1>
        {showNameQuestion && <NameQuestion onNameSubmit={handleNameSubmit} />}
      </header>
      {!showNameQuestion && !showSummary && (
        <div>
          <div className='progress-bar-container'>
            <div
              className='progress-bar'
              style={{ width: `${(step / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className={`form ${slideUp ? 'slide-up' : ''}`}>
            <form className='form'>
              <Question
                question={questions[step].question}
                options={questions[step].options}
                type={questions[step].type}
                condition={questions[step].condition}
                onSelect={(answer) => handleAnswerSelection(answer)}
                followUpQuestion={followUpQuestion}
              />
              {followUpQuestion && (
                <FollowUpQuestion
                  question={followUpQuestion}
                  answer={answers[followUpQuestion] || ''}
                  onAnswerChange={(value) => {
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [followUpQuestion]: value,
                    }));
                  }}
                />
              )}
              {validationError && (
                <div className='error-message'>{validationError}</div>
              )}
              {step < questions.length - 1 && (
                <button type='button' onClick={handleContinue}>
                  Continue
                </button>
              )}
              {step === questions.length - 1 && (
                <button type='button' onClick={handleContinue}>
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      {showSummary && <Summary name={name} answers={answers} questions={questions} />}
    </div>
  );
  
}