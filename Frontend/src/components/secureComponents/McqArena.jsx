import { useLocation } from 'react-router-dom'
import Stopwatch from "../Stopwatch"
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from "axios"

const McqArena = () => {

  const location = useLocation();
  const time = location.state?.time || ""
  const topic = location.state?.topic || ""
  const [data, setData] = useState(false);
  const [selected, setSelected] = useState(Array.from({length:4}, () => false))
  const [questions, setQuestions] = useState(Array.from({length:20} , () => [])) //ADJUST IT ACCORDING TO THE REQUIREMENT OF THE QUESTIONS

  useEffect(()=>{
    // const fetcgMcqQuestionsFromBackend = async () => {
    //   const response = await axios.get("http://localhost:8000/api/v1/user/mcquestions") // UPDDATE THIS LINK AND FETCH THE QUESTIONS FORM THE BACKEND
    //   setProblems(response.data) // UPDATE THIS BASED ON THE RESPONSE FORM THE BACKEND
    // }
  }, [])

  const handleChoosedOptionLogic = (index) => {
    setSelected((prev) =>
      prev.map((elem, idx) => (idx === index ? true : false))
    );

    console.log(selected)
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex-col items-center m-4 p-4">
        <h1 className="font-bold text-2xl">
          Topic: <span className="text-cyan-500"> {topic} </span>
        </h1>
        <p className="py-2 text-sm text-center mx-auto">
          <Stopwatch initialTime={100} />
        </p>
      </div>

      <div className="w-[600px] mx-auto">
        {/* //THIS IS FOR QUESTIONS */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet saepe,
        deserunt quibusdam pariatur quaerat, possimus quisquam tempore labore
        quia hic neque, nam distinctio harum. Iure aspernatur commodi ipsa. Eos
        temporibus hic tempore natus aspernatur commodi aliquam consequatur
        aliquid, labore, veniam recusandae molestiae accusamus beatae odit
        cupiditate odio quas id, asperiores enim sit corporis! Nostrum odit illo
        voluptatem odio laboriosam temporibus!
      </div>
      <div className="flex items-center justify-center flex-wrap gap-10 mx-auto w-[600px] mt-10">
        <div
          className={`rounded-md px-4 py-1 text-sm ${
            selected[0] === true ? "bg-green-600" : ""
          } bg-green-300 w-[15rem] h-[3rem] flex items-center justify-center font-bold hover:scale-105 transition-all duration-100`}
          onClick={() => handleChoosedOptionLogic(0)}
        >
          A <span className="mx-auto">option a</span>
        </div>
        <div
          className={`rounded-md px-4 py-1 text-sm ${
            selected[1] === true ? "bg-green-600" : ""
          } bg-green-300 w-[15rem] h-[3rem] flex items-center justify-center font-bold hover:scale-105 transition-all duration-100`}
          onClick={() => handleChoosedOptionLogic(1)}
        >
          B <span className="mx-auto">option a</span>
        </div>
        <div
          className={`rounded-md px-4 py-1 text-sm ${
            selected[2] === true ? "bg-green-600" : ""
          } bg-green-300 w-[15rem] h-[3rem] flex items-center justify-center font-bold hover:scale-105 transition-all duration-100`}
          onClick={() => handleChoosedOptionLogic(2)}
        >
          C <span className="mx-auto">option a</span>
        </div>
        <div
          className={`rounded-md px-4 py-1 text-sm ${
            selected[3] === true ? "bg-green-600" : ""
          } bg-green-300 w-[15rem] h-[3rem] flex items-center justify-center font-bold hover:scale-105 transition-all duration-100`}
          onClick={() => handleChoosedOptionLogic(3)}
        >
          D <span className="mx-auto">option a</span>
        </div>
      </div>

      <div className="w-[400px] mt-12 mx-auto px-4 flex items-center gap-4 justify-center">
        <Button className="w-[30%]" size="sm" variant="outline">
          Prev
        </Button>
        <Button className="w-[30%]" size="sm" variant="personal">
          Next
        </Button>
      </div>
    </div>
  );
}

export default McqArena
