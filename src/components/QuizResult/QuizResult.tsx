import { ResultState } from '../../type/types';

interface ResultProps {
  result: ResultState;
  onTryAgain: () => void;
}

export const QuizResult = ({ result, onTryAgain }: ResultProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold">クイズ結果</h2>
        <div className="w-40 space-y-4 text-2xl">
          <div className="flex justify-between">
            <span className="font-bold">得点:</span>
            <span>{result.score}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">正解数:</span>
            <span>{result.correctAnswers}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">不正解数:</span>
            <span>{result.wrongAnswers}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onTryAgain}
            className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            最初に戻る
          </button>
        </div>
      </div>
    </div>
  );
};
