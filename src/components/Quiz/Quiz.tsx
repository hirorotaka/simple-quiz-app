import { useState } from 'react';
import { Question, ResultState } from '../../type/types';
import { resultInitialState } from '../../quizConstants';
import { QuizResult } from '../QuizResult/QuizResult';
import { AnswerTimer } from '../AnswerTimer/AnswerTimer';

interface QuizProps {
  questions: Question[];
}

export const Quiz = ({ questions }: QuizProps) => {
  // 現在の質問のインデックスを保持する状態変数
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  //選択肢の番号を設定
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  // 現在の質問・選択・答えの変数を取得
  const { question, choices, type, correctAnswer } =
    questions[currentQuestionIndex];
  //回答の正誤を設定
  const [answer, setAnswer] = useState<boolean | null>(null);

  //点数と正解と不正解の結果を保持
  const [result, setResult] = useState<ResultState>(resultInitialState);

  //解答時間を表示する状態を設定
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);

  //結果を表示する状態を設定
  const [showResult, setShowResult] = useState(false);

  const onAnwserClick = (answer: string, index: number) => {
    console.log(answer, index);
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer: boolean | null) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestionIndex !== questions.length - 1) {
      // 次の問題へ
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 結果を表示
      setCurrentQuestionIndex(0);
      setAnswerIdx(null);
      setShowResult(true);
    }

    // 次の画面に遷移してから表示
    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  //最終的な選択肢を取得して、回答結果を保存して次の質問へ遷移
  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        {showResult ? (
          <QuizResult result={result} onTryAgain={onTryAgain} />
        ) : (
          <>
            {showAnswerTimer && (
              <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
            )}
            <div className="mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-gray-500">/{questions.length}</span>
            </div>
            <h2 className="mb-6 text-2xl font-semibold">{question}</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {choices?.map((answer, index) => (
                <li
                  key={answer}
                  onClick={() => onAnwserClick(answer, index)}
                  className={`rounded-lg border border-gray-300 px-6 py-4 text-left text-lg  ${answerIdx === index ? 'bg-blue-500 text-white' : 'transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => onClickNext(answer)}
                disabled={answerIdx === null}
                className={` ${answerIdx === null ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 '} rounded-lg  px-8 py-3 text-lg font-semibold text-white `}
              >
                {currentQuestionIndex === questions.length - 1
                  ? '終了'
                  : '次へ'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
