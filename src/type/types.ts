// 質問の種類を定義
type QuestionType = 'singleSelect' | 'textInput';

// 質問のインターフェースを定義
export interface Question {
  question: string;
  choices?: string[];
  type: QuestionType;
  correctAnswer: string;
}

// reactQuizオブジェクトの型を定義
export interface Quiz {
  questions: Question[];
}

// resultInitialStateオブジェクトの型を定義
export interface ResultState {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}
