type AnswerEffectProps = {
  isCorrect: boolean | null;
};

export const AnswerEffect = ({ isCorrect }: AnswerEffectProps) => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div
      className={`text-9xl font-extrabold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
    >
      {isCorrect ? '◯' : '×'}
    </div>
  </div>
);
