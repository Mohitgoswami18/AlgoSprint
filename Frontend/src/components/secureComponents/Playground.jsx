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
  const username = location.state?.username;
  const numberOfProblems = setting.numberOfProblems;
  const navigate = useNavigate();
  const params = useParams();
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [idx, setIdx] = useState(0);
  const roomid = params.roomid;
  const [outputRunned, setOutputRunned] = useState(Array.from({length:numberOfProblems}, () => false));
  const [codeSubmitted, setCodeSubmitted] = useState(Array.from({length: numberOfProblems}, ()=> false));
  const [activeTab, setActiveTab] = useState("testResult");
  const editorRef = useRef([]);
  const [questionDone, setQuestionDone] = useState(
    Array.from({ length: numberOfProblems }, () => false)
  );

  if (editorRef.current.length !== numberOfProblems) {
    editorRef.current = Array(numberOfProblems)
      .fill(0)
      .map(() => React.createRef());
  }
  const [code, setCode] = useState(
    Array.from({ length: numberOfProblems }, () => " ")
  );

  const timeMapping = {
    rapid: 3600,
    flash: 1800,
    classical: 7200,
  };

  const [time, setTime] = useState(timeMapping[setting?.playStyle] || 3600);
  const [problems, setProblems] = useState([]);
  const [codeSubmitOutput, setCodeSubmitOutput] = useState(
    Array.from({ length: numberOfProblems }, () => [])
  );
  const [codeOutput, setCodeOutput] = useState(
    Array.from({ length: numberOfProblems }, () => [])
  );

  let problemTestCasses = [];
  if (data) {
    problemTestCasses = problems.map((elem, idx) => ({
      testCases: elem.problemTestCases.slice(0, 2),
    }));
  }

  useEffect(() => {
    if (questionDone === numberOfProblems) {
      // Navigate the user Somewhere in the result page i guess.
      navigate(`/codingroom/${roomid}/result`, {
        state: {
          // Find these things now
          username: username,
          timeTake: timeTaken,
          problemSolved: problemSolved,
        },
      });
    }
  }, [questionDone]);

  useEffect(() => {
    const fetchQuestionsfromBackend = async () => {
      await axios
        .get("http://localhost:8000/api/v1/user/codingrooms/arena/problems", {
          params: {
            questions: setting?.numberOfProblems,
          },
        })
        .then((res) => {
          setProblems(res.data.data.questions);
          console.log(res.data.data.questions);
          setData(true);
          setErr(false);
        })
        .catch((err) => {
          console.log("some error occured", err);
          setErr(true);
          setData(false);
        });
    };

    fetchQuestionsfromBackend();

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
    editorRef.current[idx].current = editor;
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

      const actualOutput = response.data.run.output.trim();
      result.push({
        currentTestCase,
        expectedOutcome,
        actualOutput,
        correctness: expectedOutcome === actualOutput,
        stdErr: response.stderr,
      });
      setCodeOutput((prev) =>
        prev.map((item, index) => (index === idx ? result : item))
      );
    }
    console.log("runn result", codeOutput);
    setLoading(false);
    setOutputRunned((prev) => prev.map((elem, index) => (
      index === idx ? true : elem
    )));
  };

  // Check this this required some updation create a new submit window in the output window and conditionally render it
  const HandleSubmitRequest = async () => {
    console.log("inside the handleSubmitRequest");
    console.log(problems[idx].problemTestCases.length);
    setSubmitLoading(true);
    let result = [];
    for (let i = 0; i < problems[idx].problemTestCases.length; i++) {
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

      const actualOutput = response.data.run.output.trim();
      result.push({
        currentTestCase,
        expectedOutcome,
        actualOutput,
        correctness: expectedOutcome === actualOutput,
        stdErr: response.stderr,
      });

      console.log(result);
      setCodeSubmitOutput((prev) =>
        prev.map((item, index) => (index === idx ? result : item))
      );
    }
    setSubmitLoading(false);
    setCodeSubmitted((prev) => prev.map((elem, index) => (
      idx === index ? true : elem
    )));
    console.log(codeSubmitOutput);

    // Check that is the submitted code is correct for every test case
    let count = 0;
    codeSubmitOutput[idx].map((elem, idx) => {
      elem.correctness ? (count += 0) : (count += 1);
    });

    if (count === 0) {
      setQuestionDone((prev) => prev + 1);
    }
  };

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
            <CountdownTimer initialTime={time} />
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

      {/* Playground Layout */}
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
                  problem No. {problems[idx].problemRanking}
                  <GiFastForwardButton
                    className="cursor-pointer"
                    onClick={() =>
                      setIdx((prev) => (prev + 1) % problems.length)
                    }
                  />
                </div>

                <div className="">
                  <h1 className="mt-6 text-lg mb-3 font-semibold">
                    {problems[idx].problemName}
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
                <div className="flex flex-col bg-zinc-900 no-scrollbar rounded-md h-full w-full p-6 overflow-auto">
                  <div className="flex text-sm items-center text-white pb-4 justify-start gap-4">
                    <div
                      className={`cursor-pointer rounded-md px-2 py-1`}
                      style={
                        activeTab === "testResult"
                          ? { textUnderlinePosition: "under" }
                          : {}
                      }
                      onClick={() => setActiveTab("testResult")}
                    >
                      TestCase
                    </div>
                    <div className="w-[0.2rem] h-[1.5rem] bg-white"></div>
                    <div
                      className="cursor-pointer"
                      onClick={() => setActiveTab("submitResult")}
                    >
                      Submit
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    {activeTab === "testResult" ? (
                      <div className="flex items-center justify-center gap-24">
                        {outputRunned[idx] ? (
                          <div className="flex items-center text-center justify-center gap-24">
                            {codeOutput[idx].map((elem, idx) => (
                              <div key={idx} className="text-sm pb-2">
                                <div
                                  className={`py-1 px-2 rounded-md ${
                                    elem.correctness
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  } ring-1 ring-zinc-700`}
                                >
                                  <strong>testCase {idx + 1} </strong>
                                </div>
                                <div className="mt-6">
                                  <strong>
                                    input &nbsp; &nbsp;
                                    {elem.currentTestCase}
                                  </strong>
                                </div>
                                <div>
                                  <strong>
                                    expected &nbsp; &nbsp;
                                    {elem.expectedOutcome}
                                  </strong>
                                </div>
                                <div>
                                  <strong>outcome &nbsp; &nbsp;</strong>
                                  {elem.actualOutput}
                                </div>
                                {elem.stdErr ? <div> elem.stdErr </div> : ""}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-flex gap-24">
                            {problemTestCasses[idx]?.testCases?.map(
                              (elem, idx) => (
                                <div key={idx} className="text-sm pb-2">
                                  <div className="py-1 px-2 rounded-md bg-zinc-800 ring-1 ring-zinc-700">
                                    <strong>testCase {idx + 1} </strong>
                                  </div>
                                  <div className="mt-6">
                                    <strong>
                                      input &nbsp; &nbsp;{" "}
                                      {elem.input.replace("sample_input_", "")}
                                    </strong>
                                  </div>
                                  <div>
                                    <strong>
                                      expected &nbsp; &nbsp;
                                      {elem.expectedOutput.replace(
                                        "expected_output_",
                                        ""
                                      )}
                                    </strong>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {codeSubmitted[idx] ? (
                          <div> submit result</div>
                        ) : (
                          <div className="flex w-full items-center justify-center text-center text-sm">
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
