import { useEffect, useRef, useState } from "react";

export default function Stopwatch({ initialTime }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Check if end time already exists in localStorage
    let savedEnd = localStorage.getItem("countdownEnd");
    let endTime;

    if (savedEnd) {
      endTime = parseInt(savedEnd, 10);
    } else {
      endTime = Date.now() + initialTime * 1000;
      localStorage.setItem("countdownEnd", endTime);
    }

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(intervalRef.current);
        localStorage.removeItem("countdownEnd");
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [initialTime]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return <h1>{formatTime(timeLeft)}</h1>;
}
