import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Loader from "../Loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { GiFastBackwardButton } from "react-icons/gi";
import { GiFastForwardButton } from "react-icons/gi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import axios from "axios";
import CountdownTimer from "../Stopwatch";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Playground = () => {
  const starterCode = {
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    javascript:
      'function main() {\n    console.log("Hello, World!");\n}\n\nmain();',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    php: '<?php\n\nfunction main() {\n    echo "Hello, World!\\n";\n}\n\nmain();\n?>',
    python: 'def greet():\n    print("Hello, World!")\n\ngreet()',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  };

  const location = useLocation();
  const setting = location.state?.setting;
  const style = setting.playStyle;
  const username = location.state?.username;
  const realUsername = location.state?.realUsername;
  const numberOfProblems = setting.numberOfProblems;
  const totalParticipants = location.state.totalParticipants;
  const startTime = location.state.startTime;
  console.log(startTime);
  const navigate = useNavigate();
  const params = useParams();
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [idx, setIdx] = useState(0);
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  const roomid = params.roomid;
  const [outputRunned, setOutputRunned] = useState(
    Array.from({ length: numberOfProblems }, () => false)
  );
  const [codeSubmitted, setCodeSubmitted] = useState(
    Array.from({ length: numberOfProblems }, () => false)
  );
  const [activeTab, setActiveTab] = useState("testResult");

  const [problemFinished, setProblemfinished] = useState();

  const [questionDone, setQuestionDone] = useState();
  console.log(realUsername)

  const editorRef = useRef(
    Array.from({ length: numberOfProblems }, () => null)
  );
  const [code, setCode] = useState(
    Array.from({ length: numberOfProblems }, () => " ")
  );
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem(`room_${roomid}_time`);
    return savedTime ? parseInt(savedTime) : setting.time || 3600;
  });
  const [problems, setProblems] = useState([]);
  const [codeSubmitOutput, setCodeSubmitOutput] = useState(
    Array.from({ length: numberOfProblems }, () => [])
  );
  const [codeOutput, setCodeOutput] = useState(
    Array.from({ length: numberOfProblems }, () => [])
  );

  const [submitOutput, setSubmitOutput] = useState({});

  let problemTestCasses = [];
  if (data && problems[idx]) {
    problemTestCasses = problems.map((elem, idx) => ({
      testCases: elem.problemTestCases.slice(0, 2),
    }));

    console.log(problemTestCasses);
  }

  const HandleRedirectLogic = (event) => {
    console.log(
      "problem solved",
      problemFinished,
      "totalQuestions:",
      numberOfProblems
      ,"Time Taken", startTime-Math.floor(Date.now()/1000)
    );

    navigate(`/codingroom/${roomid}/result`, {
      state: {
        username: username,
        roomid: roomid,
        startTime: startTime,
        timeTake: startTime - Math.floor(Date.now() / 1000) - startTime,
        style: style,
        time: setting?.time || 3600,
        problemFinished: event,
        totalParticipants: totalParticipants,
        realUsername,
      },
    });
  };

  useEffect(() => {
    const currentRoomStored = localStorage.getItem("currentRoom");

    if (!currentRoomStored) {
      localStorage.setItem("currentRoom", roomid);
      localStorage.setItem(
        "solvedProblemBooleanArray",
        JSON.stringify(Array.from({ length: numberOfProblems }, () => false))
      );

      setQuestionDone(() =>
        JSON.parse(localStorage.getItem("solvedProblemBooleanArray"))
      );
      localStorage.setItem("solvedProblemCount", 0);
      setProblemfinished(() =>
        parseInt(localStorage.getItem("solvedProblemCount"))
      );
      return;
    }

    if (JSON.stringify(currentRoomStored) !== roomid) {
      localStorage.setItem("currentRoom", roomid);
      localStorage.setItem(
        "solvedProblemBooleanArray",
        JSON.stringify(Array.from({ length: numberOfProblems }, () => false))
      );
      localStorage.setItem("solvedProblemCount", 0);
      setQuestionDone(() =>
        JSON.parse(localStorage.getItem("solvedProblemBooleanArray"))
      );
      setProblemfinished(() =>
        parseInt(localStorage.getItem("solvedProblemCount"))
      );
    }
  }, [roomid]);

  useEffect(() => {
    let count = 0;
    questionDone?.map((elem, idx) => (elem === true ? count++ : (count += 0)));
    setProblemfinished(count);
    if (count === Number(numberOfProblems)) {
      console.log("Finised all the problems\n");
      HandleRedirectLogic(count);
    }
  }, [questionDone]);

  useEffect(() => {
    const FetchQuestionsFromBackend = async () => {
      console.log("FEtching questions from backend");
      await axios
        .get(
          "http://localhost:8000/api/v1/user/codingrooms/arena/getProblems",
          {
            params: {
              roomid,
            },
          }
        )
        .then((res) => {
          console.log("response of the questions");
          console.log(res.data.data.questions);
          setProblems(res.data.data.questions);
          setData(true);
          setErr(false);
        })
        .catch((err) => {
          console.log(
            "Error occured while fetching the question from the backend",
            err
          );
          setData(false);
          setErr(true);
        });
    };

    FetchQuestionsFromBackend();
  }, []);

  useEffect(() => {
    let versionWithLanguage;
    axios
      .get("https://emkc.org/api/v2/piston/runtimes")
      .then((response) => {
        versionWithLanguage = response.data.filter((elem) => {
          return (
            elem.language === "python" ||
            elem.language === "c" ||
            elem.language === "c++" ||
            elem.language === "java" ||
            elem.language === "javascript" ||
            elem.language === "go" ||
            elem.language === "php"
          );
        });

        setData(true);
        setVersions(versionWithLanguage);
      })
      .catch((error) => console.log("error occured", error));
  }, []);

  const handleEditorMount = (editor) => {
    editorRef.current[idx] = editor;
  };

  const handleCodeChange = (newCode) => {
    const updatedCodeArray = code.map((elem, index) => {
      if (index === idx) {
        return newCode;
      } else {
        return elem;
      }
    });
    setCode(updatedCodeArray);
  };

  const HandleRunRequest = async () => {
    console.log("inside the handleRequestMethod");
    console.log(problems[idx].problemTestCases.length);
    setLoading(true);
    let result = [];
    for (let i = 0; i < 2; i++) {
      const currentTestCase = problems[idx].problemTestCases[i].input.replace(
        "sample_input_",
        ""
      );

      console.log(currentTestCase);
      const expectedOutcome = problems[idx].problemTestCases[
        i
      ].expectedOutput.replace("expected_output_", "");
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language[0],
          version: language[1],
          files: [
            {
              name: "main." + (language[0] === "c++" ? "cpp" : language[0]),
              content: code[idx],
            },
          ],
          stdin: currentTestCase,
        }
      );

      console.log(response);

      const actualOutput = response.data.run.output.trim();
      result.push({
        currentTestCase,
        expectedOutcome,
        actualOutput,
        correctness: expectedOutcome === actualOutput,
        stdErr: String(response.data.compile.stderr),
      });
      setCodeOutput((prev) =>
        prev.map((item, index) => (index === idx ? result : item))
      );
    }
    console.log("runn result", codeOutput[idx]);
    setLoading(false);
    setActiveTab("testResult");
    setOutputRunned((prev) =>
      prev.map((elem, index) => (index === idx ? true : elem))
    );
  };

  const HandleSubmitRequest = async () => {
    setSubmitLoading(true);
    let isCorrect = true;
    let result = [];
    for (let i = 0; i < problems[idx].problemTestCases.length; i++) {
      const currentTestCase = problems[idx].problemTestCases[i].input.replace(
        "sample_input_",
        ""
      );

      const expectedOutcome = problems[idx].problemTestCases[
        i
      ].expectedOutput.replace("expected_output_", "");
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language[0],
          version: language[1],
          files: [
            {
              name: "main." + (language[0] === "c++" ? "cpp" : language[0]),
              content: code[idx],
            },
          ],
          stdin: currentTestCase,
        }
      );

      const actualOutput = response.data.run.output.trim();
      result.push({
        currentTestCase,
        expectedOutcome,
        actualOutput,
        correctness: expectedOutcome === actualOutput,
        stdErr: String(response.data.compile.stderr),
      });
      setCodeSubmitOutput((prev) =>
        prev.map((item, index) => (index === idx ? result : item))
      );

      if (result[i].correctness === false) {
        isCorrect = false;
        setSubmitOutput({
          result: "Wrong Answer",
          testCase: currentTestCase,
          testCasePassed: i,
          totalTestCase: problems[idx].problemTestCases.length,
          yourOutput: actualOutput,
          expectedOutput: expectedOutcome,
          error: response.stderr,
        });

        break;
      }
    }

    if (isCorrect) {
      setSubmitOutput({
        result: "Submitted",
        testCasePassed: problems[idx].problemTestCases.length,
        totalTestCase: problems[idx].problemTestCases.length,
      });
    }
    setSubmitLoading(false);
    setActiveTab("submit");
    setCodeSubmitted((prev) =>
      prev.map((elem, index) => (index === idx ? true : elem))
    );

    if (isCorrect) {
      setQuestionDone((prev) =>
        prev.map((elem, index) => (index === idx ? true : elem))
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("solvedProblemCount", problemFinished);
  }, [problemFinished]);

  useEffect(() => {
    localStorage.setItem(
      "solvedProblemBooleanArray",
      JSON.stringify(questionDone)
    );
  }, [questionDone]);

  return (
    <div>
      <div className=" rounded-md flex font-[Inter] items-center p-4 pb-0 w-full">
        <div>
          <Select
            onValueChange={(value) => {
              const [lang, ver] = value.split(" ");
              setLanguage([lang, ver]);
              code[idx] =
                lang === "c++" ? starterCode["cpp"] : starterCode[lang];
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {data &&
                  versions.map((elem, idx) => (
                    <SelectItem
                      key={idx}
                      value={`${elem.language} ${elem.version}`}
                    >
                      {`${elem.language} - ${elem.version}`}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mx-auto pr-[15%] flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="mx-auto cursor-pointer"
            onClick={HandleRunRequest}
          >
            {loading ? <Loader /> : <p>Run Code</p>}
          </Button>
          <Button
            size="sm"
            variant="personal"
            className="mx-auto cursor-pointer"
            onClick={HandleSubmitRequest}
          >
            {submitLoading ? <Loader /> : <p>Submit</p>}
          </Button>
        </div>
        <div className="mr-4 flex items-center justify-center gap-6">
          <div>
            <CountdownTimer
              initialSeconds={time}
              onTick={(newTime) =>
                localStorage.setItem(`room_${roomid}_time`, newTime)
              }
              onComplete={() => HandleRedirectLogic(problemFinished)}
            />
          </div>
          <Switch
            id="darkThemeToggler"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full h-[500px] p-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full px-4 border-2 rounded"
        >
          <ResizablePanel
            defaultSize={40}
            className=" border-r-3 overflow-auto border-zinc-600 dark:bg-white/4"
          >
            {err ? (
              <p className="text-red-500 text-xl h-[80%] flex items-center justify-center text-center font-bold font-[Inter]">
                There was an error while fetching the questions please try again
              </p>
            ) : data ? (
              <div className="p-6">
                <div className="w-full text-black dark:text-white font-bold font-[Inter] flex items-center justify-between px-2 text-2xl">
                  <GiFastBackwardButton
                    className="cursor-pointer"
                    onClick={() =>
                      setIdx(
                        (prev) => (prev - 1 + problems.length) % problems.length
                      )
                    }
                  />
                  <div className="flex-col ">
                    problem No. {problems[idx]?.problemRanking}
                    {questionDone[idx] && (
                      <div className="text-[10px] text-white w-fit mx-auto bg-green-500 px-2 py-1 rounded-full">
                        {" "}
                        DONE{" "}
                      </div>
                    )}
                  </div>
                  <GiFastForwardButton
                    className="cursor-pointer"
                    onClick={() =>
                      setIdx((prev) => (prev + 1) % problems.length)
                    }
                  />
                </div>

                <div className="">
                  <h1 className="mt-6 text-lg mb-3 font-semibold">
                    {problems[idx]?.problemName}
                  </h1>
                  <Badge className="text-sm rounded-md bg-cyan-500 py-1 px-2">
                    {problems[idx].problemDifficulty}
                  </Badge>
                  <p className="mt-6 tracking-normal">
                    {problems[idx].problemDescription}
                  </p>
                  <div className="mt-2">
                    {problemTestCasses[idx]?.testCases?.map((elem, idx) => (
                      <div key={idx} className="py-2">
                        <p className="">
                          <strong>Sample input 1:</strong> &nbsp;
                          {elem.input.replace("sample_input_", "")}
                        </p>
                        <p className="">
                          <strong>expected answer: &nbsp;</strong>
                          {elem.expectedOutput.replace("expected_output_", "")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Skeleton className="h-full w-full"></Skeleton>
            )}
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                defaultSize={70}
                className="w-full h-full rounded-md overflow-hidden"
              >
                <div className="flex py-2 pl-2 h-full items-center justify-center w-full ">
                  <Editor
                    className="w-full h-full"
                    language={language[0] === "c++" ? "cpp" : language[0]}
                    value={code[idx]}
                    theme={"vs-dark"}
                    onMount={handleEditorMount}
                    onChange={handleCodeChange}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle />
              <ResizablePanel
                defaultSize={30}
                className="border-t-3 border-zinc-600 p-2"
              >
                {" "}
                <div className="flex bg-zinc-900 my-1 px-8 rounded-md pb-2 pt-2 text-sm items-center text-black justify-start gap-4">
                  <div
                    onClick={() => setActiveTab("testResult")}
                    className={`px-4 py-2 font-bold cursor-pointer transition-all duration-100 
          ${
            activeTab === "testResult"
              ? "border-b-2 border-cyan-500 text-cyan-500"
              : "text-zinc-400 "
          }`}
                  >
                    TestCase
                  </div>
                  <div className="w-[0.1rem] h-[1.5rem] bg-white"></div>
                  <div
                    onClick={() => setActiveTab("submit")}
                    className={`px-4 py-2 font-bold cursor-pointer transition-all duration-100 
          ${
            activeTab === "submit"
              ? "border-b-2 border-cyan-500 text-cyan-500"
              : "text-zinc-400"
          }`}
                  >
                    Submit
                  </div>
                </div>
                <div className="flex flex-col bg-zinc-900 no-scrollbar rounded-md h-full w-full px-6 overflow-auto">
                  <div className="flex items-center gap-4 text-white">
                    {activeTab === "testResult" ? (
                      <div>
                        <div className="flex items-center gap-4 pt-4 justify-start">
                          {problemTestCasses[idx]?.testCases?.map(
                            (_, index) => (
                              <h1
                                key={index}
                                className={`px-2 text-sm  cursor-pointer rounded-full ${
                                  testCaseIndex === index ? "bg-cyan-800" : ""
                                }`}
                                onClick={() => setTestCaseIndex(index)}
                              >
                                Test {index + 1}
                              </h1>
                            )
                          )}
                        </div>

                        <div className="flex text-sm flex-col mt-2 text-white">
                          {outputRunned[idx] ? (
                            codeOutput[idx][testCaseIndex] ? (
                              <div
                                className={`p-4 mt-3 w-[40rem] rounded-md ${
                                  codeOutput[idx][testCaseIndex].correctness
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                <h2 className="font-bold mb-2">
                                  TestCase {testCaseIndex + 1}
                                </h2>
                                <p>
                                  <strong>Input:</strong>{" "}
                                  {
                                    codeOutput[idx][testCaseIndex]
                                      .currentTestCase
                                  }
                                </p>
                                <p>
                                  <strong>Expected:</strong>{" "}
                                  {
                                    codeOutput[idx][testCaseIndex]
                                      .expectedOutcome
                                  }
                                </p>
                                <p className="flex items-center gap-2">
                                  <p>
                                    {codeOutput[idx][testCaseIndex].stdErr ? (
                                      <p className="text-white mt-2">
                                        <strong className="text-white mr-2 font-bold">
                                          Error:
                                        </strong>{" "}
                                        {codeOutput[idx][testCaseIndex].stdErr}
                                      </p>
                                    ) : (
                                      <p>
                                        <strong>Output:</strong>
                                        {
                                          codeOutput[idx][testCaseIndex]
                                            .actualOutput
                                        }
                                      </p>
                                    )}
                                  </p>
                                </p>
                              </div>
                            ) : (
                              <p>No output for this test case.</p>
                            )
                          ) : (
                            <div className="pt-8 rounded-md">
                              <p>
                                <strong>Input:</strong>{" "}
                                {problemTestCasses[idx]?.testCases?.[
                                  testCaseIndex
                                ]?.input.replace("sample_input_", "")}
                              </p>
                              <p className="mt-2">
                                <strong>Expected:</strong>{" "}
                                {problemTestCasses[idx]?.testCases?.[
                                  testCaseIndex
                                ]?.expectedOutput.replace(
                                  "expected_output_",
                                  ""
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {codeSubmitted[idx] ? (
                          <div>
                            {submitOutput.result === "Wrong Answer" ? (
                              <div className="text-sm">
                                <h1>
                                  Result:{" "}
                                  <span className="text-red-500 font-bold text-xl">
                                    {submitOutput.result}
                                  </span>
                                </h1>
                                <p className="py-2">
                                  Test Cases Passed:{" "}
                                  <span className="text-red-500">
                                    {submitOutput.testCasePassed}
                                  </span>
                                  /{submitOutput.totalTestCase}
                                </p>
                                <p>Input: {submitOutput.testCase}</p>
                                <p>Expected: {submitOutput.expectedOutput}</p>
                                <p>
                                  outcome:{" "}
                                  <span className="text-red-500 ">
                                    {submitOutput.yourOutput}
                                  </span>
                                </p>
                              </div>
                            ) : (
                              <div className="text-sm">
                                <h1 className="mt-5">
                                  Result:{" "}
                                  <span className="text-green-500 font-bold text-xl">
                                    {submitOutput.result}
                                  </span>
                                </h1>
                                <p className="py-2">
                                  Test Cases Passed:{" "}
                                  {submitOutput.testCasePassed}/
                                  {submitOutput.totalTestCase}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex mt-5 w-full font-bold ml-10 items-center justify-center text-center text-sm">
                            no submissions yet
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Playground;
