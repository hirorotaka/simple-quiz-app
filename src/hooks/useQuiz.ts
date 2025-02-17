import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { resultInitialState } from '../quizConstants';
import { Question, ResultState } from '../types';

type QuizStartProps = {
  questions: Question[];
  setQuizStarted: Dispatch<SetStateAction<boolean>>;
};

export const useQuiz = ({ questions, setQuizStarted }: QuizStartProps) => {
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
  const currentQuestion = questions[currentQuestionIndex];

  // 選択式問題の回答処理
  const onAnwserClick = (answer: string, index: number) => {
    setAnswerIdx(index);
    if (answer === currentQuestion.correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  // テキスト入力問題の回答処理
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
    setAnswer(e.target.value === currentQuestion.correctAnswer);
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
  return {
    currentQuestion,
    question: currentQuestion.question,
    answerIdx,
    inputAnswer,
    isCorrect,
    showAnswerTimer,
    showEffect,
    showResult,
    result,
    currentQuestionIndex,
    onClickNext,
    onAnwserClick,
    handleInputChange,
    handleTimeUp,
    onTryAgain,
  };
};
