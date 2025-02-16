type ChoiceAnswerProps = {
  answerIdx: number | null;
  choices: string[] | undefined;
  onAnswerClick: (answer: string, index: number) => void;
};

const ChoiceAnswer = ({
  answerIdx,
  choices,
  onAnswerClick,
}: ChoiceAnswerProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {choices?.map((answer, index) => (
        <li
          key={answer}
          onClick={() => onAnswerClick(answer, index)}
          className={`rounded-lg border border-gray-300 px-6 py-4 text-left text-lg  ${answerIdx === index ? 'bg-blue-500 text-white' : 'transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
        >
          {answer}
        </li>
      ))}
    </ul>
  );
};

export default ChoiceAnswer;
