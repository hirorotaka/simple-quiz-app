// 質問の種類を定義
type QuestionType = 'singleSelect' | 'textInput';

// 質問のインターフェースを定義
export type Question = {
  question: string;
  choices?: string[];
  type: QuestionType;
  correctAnswer: string;
};

// reactQuizオブジェクトの型を定義
export type Quiz = {
  questions: Question[];
};

// resultInitialStateオブジェクトの型を定義
export type ResultState = {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
};
