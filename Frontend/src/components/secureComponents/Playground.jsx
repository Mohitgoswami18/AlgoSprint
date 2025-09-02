import { useState, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Loader from "../Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  const [code, setCode] = useState(starterCode["python"]);
  const [err, setErr] = useState("");
  const [output, setOutput] = useState("");

  const editorRef = useRef();
  const location = useLocation();
  const setting = location.state?.setting;
  console.log(setting)

  const timeMapping = {
    rapid: 3600,
    flash: 1800,
    classical: 7200,
  };
  const [time, setTime] = useState(timeMapping[setting?.playStyle] || 3600);
  const [problems, setProblems] = useState({});

  useEffect(() => {
    const fetchQuestionsfromBackend = async () => {
      await axios.get("https://algosprint-vxi4.onrender.com/api/v1/user/problems", {
        questions: setting?.numberOfProblems,
      })
      .then((res) => {
        console.log(res);
      })
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

  const HandleSubmitRequest = async () => {
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
  };

  return (
    <div>
      <div className="py-3 rounded-md flex items-center p-4 w-full">
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
            size="lg"
            variant="personal"
            className="mx-auto cursor-pointer"
            onClick={HandleSubmitRequest}
          >
            {loading ? <Loader /> : <p>Run Code</p>}
          </Button>
          <div className="pl-5">
            <CountdownTimer initialTime={time} />
          </div>
        </div>

        <Switch
          id="darkThemeToggler"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
          className="cursor-pointer"
        />
      </div>

      {/* Playground Layout */}
      <div className="w-full h-[500px] p-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full px-4 border-2 rounded"
        >
          <ResizablePanel
            defaultSize={40}
            className=" border-r-3 border-blue-500"
          >
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">Problem Statement</span>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                defaultSize={70}
                className="w-full h-full overflow-hidden"
              >
                <div className="flex h-full items-center justify-center w-full rounded-md">
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
                className="border-t-3 border-blue-500"
              >
                <div className="flex flex-col h-full w-full p-6 overflow-auto">
                  <span className="font-semibold ">Output:</span>
                  <pre className="text-sm text-white bg-black p-2 rounded mt-2">
                    {err ? err : output}
                  </pre>
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
