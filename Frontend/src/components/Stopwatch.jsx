import { useEffect, useState } from "react";

export default function CountdownTimer({ initialSeconds, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onComplete]);

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
    <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-800 text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Countdown Timer</h1>
      <p className="text-4xl font-mono">{formatTime(secondsLeft)}</p>
    </div>
  );
}
