type InputAnswerProps = {
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputAnswer = ({ value, onInputChange }: InputAnswerProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onInputChange}
      className="w-80 rounded-lg border border-gray-300 px-4 py-2 text-left text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default InputAnswer;
