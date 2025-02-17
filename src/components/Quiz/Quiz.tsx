import { Dispatch, SetStateAction, useEffect } from 'react';
import { Question } from '../../types';
import { QuizResult } from '../QuizResult/QuizResult';
import { AnswerTimer } from '../AnswerTimer/AnswerTimer';
import { AnswerEffect } from '../AnswerTimer/AnswerEffect';
import InputAnswer from './InputAnswer';
import ChoiceAnswer from './ChoiceAnswer';
import { useQuiz } from '../../hooks/useQuiz';
import { resultInitialState } from '../../quizConstants';

type QuizProps = {
  questions: Question[];
  playerName: string;
  setQuizStarted: Dispatch<SetStateAction<boolean>>;
};

export const Quiz = ({ questions, playerName, setQuizStarted }: QuizProps) => {
  const {
    currentQuestion,
    answer,
    answerIdx,
    inputAnswer,
    isCorrect,
    showAnswerTimer,
    showEffect,
    showResult,
    result,
    currentQuestionIndex,
    setResult,
    setShowResult,
    handleAnswerClick,
    processAnswer,
    handleInputChange,
    ProgressBarStart,
  } = useQuiz({
    questions,
  });

  useEffect(() => {
    if (!showResult) {
      ProgressBarStart();
    }
  }, [currentQuestionIndex]);

  const onClickNext = () => {
    processAnswer(answer);
  };

  const handleTimeUp = () => {
    processAnswer(false);
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      {/* クイズ結果 */}
      {showResult ? (
        <QuizResult result={result} onTryAgain={onTryAgain} />
      ) : (
        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <div className="flex min-h-[500px] flex-col justify-between">
            {showAnswerTimer && (
              <AnswerTimer duration={15} onTimeUp={handleTimeUp} />
            )}
            {showEffect && <AnswerEffect isCorrect={isCorrect} />}
            <div>
              <h2 className="mb-4 break-words text-xl font-semibold">
                こんにちは、{playerName}さん！
              </h2>
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {currentQuestionIndex + 1}
                </span>
                <span className="text-gray-500">/{questions.length}</span>
              </div>
              <h2 className="mb-6 break-words text-2xl font-semibold">
                {currentQuestion.question}
              </h2>
              <div className="min-h-[200px]">
                {currentQuestion.type === 'textInput' ? (
                  <InputAnswer
                    value={inputAnswer}
                    onInputChange={handleInputChange}
                  />
                ) : (
                  <ChoiceAnswer
                    answerIdx={answerIdx}
                    choices={currentQuestion.choices}
                    onAnswerClick={handleAnswerClick}
                  />
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClickNext}
                disabled={answerIdx === null && !inputAnswer}
                className={`
                ${
                  answerIdx === null && !inputAnswer
                    ? 'cursor-not-allowed bg-gray-300'
                    : 'bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                }
                rounded-lg px-8 py-3 text-lg font-semibold text-white
              `}
              >
                {currentQuestionIndex === questions.length - 1
                  ? '終了'
                  : '次へ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
