import { useEffect, useRef, useState } from 'react';

type AnswerTimerProps = {
  duration: number;
  onTimeUp: () => void;
};

export const AnswerTimer = ({ duration, onTimeUp }: AnswerTimerProps) => {
  const [counter, setCounter] = useState(0); // 経過時間のカウンター
  const [progressLoaded, setProgressLoaded] = useState(0); // プログレスバーの進捗率
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // setIntervalの参照を保持

  useEffect(() => {
    // 1秒ごとにcounterを1増やす
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    // クリーンアップ関数: コンポーネントのアンマウント時にインターバルをクリア
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // プログレスバーの進捗率を計算 (0-100%)
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="mb-4 w-full">
      <div className="relative h-2 w-full bg-gray-300">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 duration-1000 ease-linear"
          style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
              progressLoaded < 40
                ? 'lightgreen'
                : progressLoaded < 70
                  ? 'orange'
                  : 'red'
            }`,
          }}
        ></div>
      </div>
    </div>
  );
};
