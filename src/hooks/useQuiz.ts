import { ChangeEvent, useRef, useState } from 'react';
import { resultInitialState } from '../quizConstants';
import { Question, ResultState } from '../types';

type QuizStartProps = {
  questions: Question[];
};

export const useQuiz = ({ questions }: QuizStartProps) => {
  // 問題・回答関連
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');

  // UI表示制御
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [showEffect, setShowEffect] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  // 結果管理
  const [result, setResult] = useState<ResultState>(resultInitialState);

  // 処理制御用ref
  const isProcessingAnswer = useRef(false);

  // 現在の問題
  const currentQuestion = questions[currentQuestionIndex];

  // 選択式問題の回答処理
  const handleAnswerClick = (answer: string, index: number) => {
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

  const AnswerSHowEffect = async (finalAnswer: boolean | null) => {
    setShowEffect(true); // 正誤エフェクト表示
    setIsCorrect(finalAnswer === true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setShowEffect(false);
    setIsCorrect(null);
  };

  const ProgressBarStart = () => {
    setShowAnswerTimer(true);
  };

  const processAnswer = async (finalAnswer: boolean | null) => {
    // 重複回答防止
    if (isProcessingAnswer.current) return;
    isProcessingAnswer.current = true;

    // 正誤エフェクトの表示
    await AnswerSHowEffect(finalAnswer);

    // 回答タイマーの停止(アンマウントさせるため)
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
      setAnswerIdx(null);
      setInputAnswer('');
    } else {
      setCurrentQuestionIndex(0);
      setAnswerIdx(null);
      setShowResult(true);
    }

    isProcessingAnswer.current = false;
  };

  return {
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
    handleInputChange,
    processAnswer,
    ProgressBarStart,
  };
};
