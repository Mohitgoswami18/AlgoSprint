import { useLocation, useNavigate } from "react-router-dom";
import Stopwatch from "../Stopwatch";
import Loader from "../Loader";
import {Skeleton} from "@/components/ui/skeleton"
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const McqArena = () => {
  const location = useLocation();
  const topic = location.state?.topic || "";
  const roomid = location.state?.roomid;
  const startTime = location.state.startTime
  const totalParticipants = location.state?.totalParticipants
  const username = location.state?.username;
  const realUsername = location.state?.realUsername;
  console.log(realUsername)
  const navigate = useNavigate();

  const [data, setData] = useState(false);
  const [index, setIndex] = useState(0);

  const selectedOptionsRef = useRef(Array(20).fill(""));

  const [options, setOptions] = useState(Array.from({ length: 20 }, () => []));
  const [correctOption, setCorrectOption] = useState(
    Array.from({ length: 20 }, () => "")
  );
  const [questions, setQuestions] = useState(
    Array.from({ length: 20 }, () => [])
  );

  const [selected, setSelected] = useState();

  useEffect(() => {
      const currentRoomStored = localStorage.getItem("currentRoom");
  
      if (!currentRoomStored) {
        localStorage.setItem("currentRoom", roomid);
        localStorage.setItem(
          "selectedState",
          JSON.stringify(Array.from({ length: 20 }, () => [false, false, false, false]))
        );

        localStorage.setItem("optionMarkedList", JSON.stringify(Array(20).fill("")));
        selectedOptionsRef.current = JSON.parse(
          localStorage.getItem("optionMarkedList")
        );
        setSelected(() => JSON.parse(localStorage.getItem("selectedState")));
        return;
      }
  
      if (JSON.stringify(currentRoomStored) !== roomid) {
        localStorage.setItem("currentRoom", roomid);

        localStorage.setItem(
          "optionMarkedList",
          JSON.stringify(Array(20).fill(""))
        );
        selectedOptionsRef.current = JSON.parse(
          localStorage.getItem("optionMarkedList")
        );

        localStorage.setItem(
          "selectedState",
          JSON.stringify(
            Array.from({ length: 20 }, () => [false, false, false, false])
          )
        );

        setSelected(() => JSON.parse(localStorage.getItem("selectedState")));
      }
    }, [roomid]);

  useEffect(() => {
    const fetchMcqQuestionsFromBackend = async () => {
      if (!roomid) return;
      try {
        console.log("Fetching questions...");
        const response = await axios.get(
          `https://algosprint-vxi4.onrender.com/api/v1/user/mcqrooms/arena/getProblems`,
          { params: { roomid } }
        );

        setData(true);

        const problems = response.data.data.questions.map(
          (elem) => elem.question
        );
        setQuestions(problems);

        const mcqOptions = response.data.data.questions.map(
          (elem) => elem.options
        );
        setOptions(mcqOptions);

        const correctAnswer = response.data.data.questions.map(
          (elem) => elem.answer
        );
        setCorrectOption(correctAnswer);
      } catch (err) {
        console.error("Error fetching MCQ questions:", err);
        setData(false);
      }
    };

    fetchMcqQuestionsFromBackend();
  }, [roomid]);


  
  const handleChoosedOptionLogic = (choice) => {
    setSelected((prev) => {
      const updated = prev.map((elem, idx) =>
        idx === index
          ? elem.map((option, i) => (i === choice ? true : false))
          : elem
      );
      localStorage.setItem("selectedState", JSON.stringify(updated));
      return updated;
    });

    const newSelection = selectedOptionsRef.current.map((elem, idx) =>
      idx === index ? choice : elem
    );
    selectedOptionsRef.current = newSelection;
    localStorage.setItem("optionMarkedList", JSON.stringify(newSelection));
  };

  const handleSubmit = () => {
    console.log("INside the submit function")
    let score = 20;
    correctOption.forEach((elem, idx) => {
      if (elem !== selectedOptionsRef.current[idx]) {
        score--;
      }
    });
    
    const timeTaken = Math.floor(Date.now() / 1000) - startTime;
    console.log(timeTaken)
    
    navigate(`/mcqroom/${roomid}/result`, {
      state: {
        username,
        score,
        startTime,
        timeTaken,
        totalParticipants,
        time: 1200,
        realUsername,
      },
    });
  };


  return (
    <div className="flex w-full h-screen font-[Inter]">
      <div className="w-[20%] ">
        <div className="py-32 h-screen bg-blue-200 rounded-md p-4 flex flex-wrap gap-2 items-center justify-center">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border cursor-pointer
              ${
                selectedOptionsRef.current[i] !== ""
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }
              ${index === i ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cyan-50 h-full w-[80%] grid place-items-center">
        <div className="flex-col items-center m-4 p-4">
          <h1 className="font-bold text-2xl">
            Topic: <span className="text-cyan-500">{topic}</span>
          </h1>
          <p className="py-2 text-sm text-center mx-auto">
            <Stopwatch initialSeconds={1200} onComplete={handleSubmit} />
          </p>
          <div className="flex items-center justify-center">
            Question
            <p className="px-3 text-center">
              <strong>{index + 1}</strong>
            </p>
          </div>
        </div>

        {data ? (
          <div className="w-[600px] mx-auto text-center">
            {questions[index]}
          </div>
        ) : (
          <Skeleton className="w-full h-[200px]" />
        )}

        {data ? (
          <div className="flex items-center justify-center flex-wrap gap-10 mx-auto w-[600px] mt-8">
            {options[index]?.map((elem, idx) => (
              <div
                key={idx}
                className={`rounded-md px-4 py-2 text-sm ${
                  selected[index][idx] ? "dark:bg-blue-500 bg-green-600" : ""
                } dark:bg-green-600 bg-green-400 w-[15rem] h-[3rem] flex items-center justify-center font-semibold hover:scale-105 transition-all duration-100 cursor-pointer`}
                onClick={() => handleChoosedOptionLogic(idx)}
              >
                {"A" + idx} <span className="mx-auto">{elem}</span>
              </div>
            ))}
          </div>
        ) : (
          <Skeleton className="w-full h-[200px]" />
        )}

        <div className="w-[400px] mt-20 mx-auto px-4 flex items-center gap-4 justify-center">
          <Button
            className="w-[30%]"
            size="sm"
            variant="outline"
            onClick={() => setIndex((prev) => (prev - 1 + 20) % 20)}
          >
            Prev
          </Button>
          <Button
            className="w-[30%]"
            size="sm"
            variant="destructive"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            className="w-[30%]"
            size="sm"
            variant="personal"
            onClick={() => setIndex((prev) => (prev + 1) % 20)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default McqArena;
