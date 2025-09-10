import { useLocation, useNavigate } from "react-router-dom";
import Stopwatch from "../Stopwatch";
import Loader from "../Loader";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const McqArena = () => {
  const location = useLocation();
  const time = location.state?.time || "";
  const topic = location.state?.topic || "";
  const roomid = location.state?.roomid;
  const username = location.state?.username;
  const [data, setData] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const selectedOptionsRef = useRef (Array(20).fill(""));
  const [options, setOptions] = useState(Array.from({ length: 20 }, () => []));
  const [correctOption, setCorrectOption] = useState(
    Array.from({ length: 20 }, () => "")
  );
  const [selected, setSelected] = useState(
    Array.from({ length:20 }, ()=> [false, false, false, false])
  );
  const [questions, setQuestions] = useState(
    Array.from({ length: 20 }, () => [])
  );

  useEffect(() => {
    const fetcgMcqQuestionsFromBackend = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/mcqroom/arena/${topic}/problems`
      );
      setData(true);
      const problems = response.data.data.Questions.map(
        (elem, idx) => elem.question
      );
      setQuestions(problems);
      const mcqOptions = response.data.data.Questions.map(
        (elem, idx) => elem.options
      );

      setOptions(mcqOptions);
      const correctAnswer = response.data.data.Questions.map(
        (elem, idx) => elem.answer
      );

      setCorrectOption(correctAnswer);
    };

    fetcgMcqQuestionsFromBackend();
  }, []);

  const handleChoosedOptionLogic = (choice) => {
    setSelected((prev) =>
      prev.map((elem, idx) => (idx === index ? elem.map((option, idx) => (idx === choice) ? true : false) : elem))
    );

    const newSelection = selectedOptionsRef.current.map((elem, idx) => (
      idx === index ? choice : elem
    ))
    
    selectedOptionsRef.current = newSelection;
  };

  const handleSubmit = () => {
    let score = 20;
    correctOption.map((elem,idx) => {
      if(elem !== selectedOptionsRef.current[idx]) {
        score--;
      }
    })

    navigate(`/mcqroom/${roomid}/result`,{
      state: {
        username,
        score
      }
    });
  }

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex-col items-center m-4 p-4">
        <h1 className="font-bold text-2xl">
          Topic: <span className="text-cyan-500"> {topic} </span>
        </h1>
        <p className="py-2 text-sm text-center mx-auto">
          <Stopwatch initialTime={1200} />
        </p>
        <div className="flex items-center justify-center ">
          Question
          <p className="px-3 text-center">
            <strong>{index + 1}</strong>
          </p>
        </div>
      </div>

      {data ? (
        <div className="w-[600px] mx-auto text-center">{questions[index]}</div>
      ) : (
        <Loader></Loader>
      )}
      {
        data ? (<div className="flex items-center justify-center flex-wrap gap-10 mx-auto w-[600px] mt-10">
        {options[index]?.map((elem, idx) => (
          <div
            className={`rounded-md px-4 py-2 text-sm ${
              selected[index][idx] === true
                ? "dark:bg-blue-500 bg-green-600"
                : ""
            } dark:bg-green-600 bg-green-400 w-[15rem] h-[3rem] flex items-center justify-center font-semibold hover:scale-105 transition-all duration-100`}
            onClick={() => handleChoosedOptionLogic(idx)}
          >
            {"A" + idx} <span className="mx-auto">{elem}</span>
          </div>
        ))}
      </div>) : (
        <Loader></Loader>
      )
      }

      <div className="w-[400px] mt-12 mx-auto px-4 flex items-center gap-4 justify-center">
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
          onClick={()=> handleSubmit()}
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
  );
};

export default McqArena;
