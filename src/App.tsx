import { useState } from 'react';
import { Quiz } from './components/Quiz/Quiz';
import { prefectureQuiz } from './quizConstants';
import { QuizStart } from './components/QuizStart/QuizStart';
import { Question } from './types';
import './App.css';

function App() {
  const questions: Question[] = prefectureQuiz.questions;
  const [quizStarted, setQuizStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const handleStart = (name: string) => {
    setPlayerName(name);
    setQuizStarted(true);
  };

  return (
    <>
      {!quizStarted ? (
        <QuizStart onStart={handleStart} />
      ) : (
        <Quiz
          questions={questions}
          playerName={playerName}
          setQuizStarted={setQuizStarted}
        />
      )}
    </>
  );
}

export default App;
