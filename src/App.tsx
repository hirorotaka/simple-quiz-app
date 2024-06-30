import { useState } from 'react';
import './App.css';
import { Quiz } from './components/Quiz/Quiz';
import { reactQuiz } from './quizConstants';
import { Question } from './type/types';
import { QuizStart } from './components/QuizStart/QuizStart';

function App() {
  const [questions] = useState<Question[]>(reactQuiz.questions);
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
