import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { Question, ResultState } from '../../types';
import { resultInitialState } from '../../quizConstants';
import { QuizResult } from '../QuizResult/QuizResult';
import { AnswerTimer } from '../AnswerTimer/AnswerTimer';
import { AnswerEffect } from '../AnswerTimer/AnswerEffect';
import InputAnswer from './InputAnswer';
import ChoiceAnswer from './ChoiceAnswer';

type QuizProps = {
  questions: Question[];
  playerName: string;
  setQuizStarted: Dispatch<SetStateAction<boolean>>;
};

export const Quiz = ({ questions, playerName, setQuizStarted }: QuizProps) => {
  // 問題・回答関連
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');

  // UI表示制御
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [showEffect, setShowEffect] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 結果管理
  const [result, setResult] = useState<ResultState>(resultInitialState);

  // 処理制御用ref
  const isProcessingAnswer = useRef(false);

  // 現在の問題
  const { question, choices, type, correctAnswer } =
    questions[currentQuestionIndex];

  // 選択式問題の回答処理
  const onAnwserClick = (answer: string, index: number) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  // テキスト入力問題の回答処理
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
    setAnswer(e.target.value === correctAnswer);
  };

  const processAnswer = (finalAnswer: boolean | null) => {
    // 重複回答防止
    if (isProcessingAnswer.current) return;
    isProcessingAnswer.current = true;

    setShowEffect(true); // 正誤エフェクト表示
    setInputAnswer('');
    setIsCorrect(finalAnswer === true);

    // 300ms後に次の問題へ移行
    setTimeout(() => {
      setShowEffect(false);
      setAnswerIdx(null);
      setShowAnswerTimer(false);
      // スコアと正誤カウントの更新
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

      // 次の問題への移行か結果表示の判定
      if (currentQuestionIndex !== questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCurrentQuestionIndex(0);
        setAnswerIdx(null);
        setShowResult(true);
      }

      setTimeout(() => {
        setShowAnswerTimer(true);
        isProcessingAnswer.current = false;
      }, 0);
    }, 300);
  };

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
              <AnswerTimer duration={20} onTimeUp={handleTimeUp} />
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
                {question}
              </h2>
              <div className="min-h-[200px]">
                {type === 'textInput' ? (
                  <InputAnswer
                    value={inputAnswer}
                    onInputChange={handleInputChange}
                  />
                ) : (
                  <ChoiceAnswer
                    answerIdx={answerIdx}
                    choices={choices}
                    onAnswerClick={onAnwserClick}
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
