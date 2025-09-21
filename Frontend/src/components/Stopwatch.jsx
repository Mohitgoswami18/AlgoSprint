import { useState, useEffect } from "react"

export default function CountdownTimer({ initialSeconds, onTick, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const newTime = prev - 1;
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTick, onComplete]);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center rounded-2x">
      <p className="text-lg font-[Inter]">{formatTime(secondsLeft)}</p>
    </div>
  );
}
