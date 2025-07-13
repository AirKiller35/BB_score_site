import React, {useState, useEffect, useRef} from "react";
import ReactDOM from 'react-dom/client';

function Clock ({ maxTimeMin, maxTimeSec }) {
  const totalInitialSeconds = maxTimeMin * 60 + maxTimeSec;
  const [totalSeconds, setTotalSeconds] = useState(totalInitialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  const displayTime = `${min}:${sec < 10 ? "0" + sec : sec}`;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTotalSeconds(maxTimeSec);
    setIsRunning(false);
  };

  return (
    <>
      <h3>{displayTime}</h3>

      {!isRunning && (<button
        className="startBtn"
        onClick={() => {setIsRunning(true);}}
      >
        <i className="fa-solid fa-play"></i>
      </button>)}

      {isRunning && (<button
        className="pauseBtn"
        onClick={() => {
          clearInterval(timerRef.current);
          setIsRunning(false);
        }}
      >
        <i className="fa-solid fa-pause"></i>
      </button>)}

      {maxTimeMin === 0 && (
        <button className="resetBtn" onClick={resetTimer}>
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
      )}
    </>
  );
}

export default Clock;