import { ResultState, ReactQuiz } from './type/types';

export const reactQuiz: ReactQuiz = {
  questions: [
    {
      question:
        'React.jsでパフォーマンスを向上させるために使用されるのは次のうちどれですか？',
      choices: ['仮想DOM', '通常のDOM', 'AとB両方', '上記のいずれでもない'],
      type: 'singleSelect',
      correctAnswer: '仮想DOM',
    },
    {
      question:
        'コンポーネント間でデータを渡す方法を提供するのは_________です。',
      type: 'textInput',
      correctAnswer: 'props',
    },
    {
      question: 'ReactJSとは何ですか？',
      choices: [
        'サーバーサイドフレームワーク',
        'ユーザーインターフェースフレームワーク',
        'aとb両方',
        '上記のいずれでもない',
      ],
      type: 'singleSelect',
      correctAnswer: 'ユーザーインターフェースフレームワーク',
    },
    {
      question:
        '外部からコンポーネントにデータを渡すために使用されるものを特定してください。',
      choices: ['引数付きのRender', 'setState', 'PropTypes', 'props'],
      type: 'singleSelect',
      correctAnswer: 'props',
    },
    {
      question: 'React.jsはどの言語で書かれていますか？',
      choices: ['Python', 'Java', 'C#', 'JavaScript'],
      type: 'singleSelect',
      correctAnswer: 'JavaScript',
    },
    {
      question: 'Babelとは何ですか？',
      choices: [
        'JavaScriptインタプリタ',
        'JavaScriptトランスパイラ',
        'JavaScriptコンパイラ',
        '上記のいずれでもない',
      ],
      type: 'singleSelect',
      correctAnswer: 'JavaScriptコンパイラ',
    },
  ],
};

export const resultInitialState: ResultState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};
