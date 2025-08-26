import { useState, useEffect } from "react";
import { IoPlay } from "react-icons/io5";
import { FaStop } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);


  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{ fontSize: "1rem", fontFamily: "Inter" }}
      className="flex items-center justify-center gap-4"
    >
      <div>{formatTime(seconds)}</div>
      <div className="gap-2 bg-zinc-200 px-4 py-2 rounded-md dark:bg-white/4 flex items-center justify-center">
        <div
          onClick={() => {
            setIsRunning((prev)=> !prev);
          }}
        >
          {!isRunning ? (
            <IoPlay className="text-[18px] hover:scale-110 focus:bg-white transition-all duration-100 cursor-pointer" />
          ) : (
            <FaStop className="text-[18px] hover:scale-110 focus:bg-white transition-all duration-100 cursor-pointer" />
          )}
        </div>
        <VscDebugRestart
          className="text-[18px] hover:scale-110 focus:bg-white transition-all duration-100 cursor-pointer"
          onClick={() => {
            setIsRunning(false), setSeconds(0);
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
