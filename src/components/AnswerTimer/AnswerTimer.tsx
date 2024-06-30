import { useEffect, useRef, useState } from 'react';

interface AnswerTimerProps {
  duration: number;
  onTimeUp: () => void;
}

export const AnswerTimer = ({ duration, onTimeUp }: AnswerTimerProps) => {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
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
