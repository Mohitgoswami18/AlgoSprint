import { useState, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Loader from "../Loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch";
import { GiFastBackwardButton } from "react-icons/gi"; 
import { GiFastForwardButton } from "react-icons/gi"; 
import { Skeleton } from "@/components/ui/Skeleton"
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
import { useLocation } from "react-router-dom";

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

  const [language, setLanguage] = useState([]);
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [code, setCode] = useState(" Select a language and start writing your code");
  const [err, setErr] = useState(false);
  const [output, setOutput] = useState("");
  const [idx, setIdx] = useState(0);

  const editorRef = useRef();
  const location = useLocation();
  const setting = location.state?.setting;
  
  const timeMapping = {
    rapid: 3600,
    flash: 1800,
    classical: 7200,
  };
  
  const [time, setTime] = useState(timeMapping[setting?.playStyle] || 3600);
  const [problems, setProblems] = useState({});
  console.log(idx)
  console.log(problems)

  let problemTestCasses = [];
  if(data) {
    problemTestCasses = problems.map((elem, idx) => ({
      ...problems,
      testCases: elem.problemTestCases.slice(0,2)
    }));
  }
  
  useEffect(() => {
    const fetchQuestionsfromBackend = async () => {
      console.log("Fetching the data from the backend")
      await axios
        .get("http://localhost:8000/api/v1/user/codingrooms/arena/problems", {
          params: {
            questions: setting?.numberOfProblems,
          },
        })
        .then((res) => {
          console.log(res.data.data.questions);
          setProblems(res.data.data.questions);
          setData(true);
          setErr(false);
        })
        .catch((err) => {
          console.log("some error occured", err);
          setErr(true);
          setData(false);
        });
    }

    fetchQuestionsfromBackend ();

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
    editorRef.current = editor;
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const HandleRunRequest = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language[0],
          version: language[1],
          files: [
            {
              name: "main." + (language[0] === "c++" ? "cpp" : language[0]),
              content: code,
            },
          ],
          stdin: "",
        }
      );

      setErr(response.data.run.stderr);
      setOutput(response.data.run.output);
    } catch (error) {
      console.log("there was an error while running the code", error);
    }

    setLoading(false);
  }

  const HandleSubmitRequest = async () => {
    setSubmitLoading(true);

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language[0],
          version: language[1],
          files: [
            {
              name: "main." + (language[0] === "c++" ? "cpp" : language[0]),
              content: code,
            },
          ],
          stdin: "",
        }
      );

      setErr(response.data.run.stderr);
      setOutput(response.data.run.output);
    } catch (error) {
      console.log("there was an error while running the code", error);
    }

    setSubmitLoading(false);
  };

  return (
    <div>
      <div className=" rounded-md flex items-center p-4 pb-0 w-full">
        <div>
          <Select
            onValueChange={(value) => {
              const [lang, ver] = value.split(" ");
              setLanguage([lang, ver]);
              setCode(lang === "c++" ? starterCode["cpp"] : starterCode[lang]);
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
            className=" border-r-3 border-zinc-600 dark:bg-white/4"
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
                    value={code}
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
                <div className="flex flex-col bg-zinc-900 rounded-md h-full w-full p-6 overflow-auto">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-12">
                      {problemTestCasses[idx]?.testCases?.map((elem, idx) => (
                        <div key={idx} className="pb-2 text-sm">
                          <div className="pb-4">
                            <strong>testCase {idx + 1} </strong>
                          </div>
                          <div>
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
                      ))}
                    </div>
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