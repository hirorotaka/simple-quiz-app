import { ResultState, Quiz } from './types';

export const prefectureQuiz: Quiz = {
  questions: [
    {
      question: '日本で最も人口の多い都道府県はどこですか？',
      choices: ['東京都', '大阪府', '神奈川県', '愛知県'],
      type: 'singleSelect',
      correctAnswer: '東京都',
    },
    {
      question: '「青森ねぶた祭り」で有名な都道府県はどこですか？',
      type: 'textInput',
      correctAnswer: '青森県',
    },
    {
      question: '「富士山」があるのはどこの都道府県ですか？',
      choices: ['山梨県', '岐阜県', '長野県', '静岡県'],
      type: 'singleSelect',
      correctAnswer: '静岡県',
    },
    {
      question: '「広島平和記念公園」があるのはどこの都道府県ですか？',
      choices: ['広島県', '山口県', '岡山県', '福岡県'],
      type: 'singleSelect',
      correctAnswer: '広島県',
    },
    {
      question: '「琵琶湖」があるのはどこの都道府県ですか？',
      choices: ['静岡県', '滋賀県', '岐阜県', '三重県'],
      type: 'singleSelect',
      correctAnswer: '滋賀県',
    },
  ],
};

export const resultInitialState: ResultState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};
