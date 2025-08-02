import React, {useState, useEffect, useRef} from "react";
import ReactDOM from 'react-dom/client';

function Clock ({ maxTimeMin, maxTimeSec, onTimeout , matchId, clockType}) {
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

  useEffect(() => {
    if(totalSeconds === 0){
      clearInterval(timerRef.current);
      onTimeout?.();
      setTotalSeconds(totalInitialSeconds)
    }
  },[totalSeconds]);

  useEffect(() => {
    const totalInitialSeconds = maxTimeMin * 60 + maxTimeSec;
    setTotalSeconds(totalInitialSeconds);
    setIsRunning(false);
    clearInterval(timerRef.current);
  }, [maxTimeMin, maxTimeSec]);

  useEffect(() => {
    if(matchId && isRunning) {
      fetch(`/match/${matchId}/timer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [clockType]: totalSeconds })
      }).catch((err) => console.error("timer sync error: ", err));
    }
  }, [totalSeconds, matchId, isRunning]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTotalSeconds(maxTimeMin * 60 + maxTimeSec);
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