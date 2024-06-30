import { useState } from 'react';
import './App.css';
import { Quiz } from './components/Quiz/Quiz';
import { reactQuiz } from './quizConstants';
import { Question } from './type/types';

function App() {
  const [questions, setQuestions] = useState<Question[]>(reactQuiz.questions);
  return (
    <>
      <Quiz questions={questions} />
    </>
  );
}

export default App;
