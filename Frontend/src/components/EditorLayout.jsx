import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import Loader from "./Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Clock from "./Clock";
import axios from "axios";

const EditorLayout = () => {
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

  const editorRef = useRef();

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const [language, setLanguage] = useState([]);
  const [theme, setTheme] = useState(0); // 0 -> light 1->dark
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [code, setCode] = useState(starterCode[language]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    let versionWithLanguage;
    axios
      .get("https://emkc.org/api/v2/piston/runtimes")
      .then((response) => {
        versionWithLanguage = response.data.filter((elem, idx) => {
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

  const HandleSubmitRequest = async () => {
    setLoading(true);

    await axios
      .post("https://emkc.org/api/v2/piston/execute", {
        language: language[0],
        version: language[1],
        files: [
          {
            name: "main." + language[0] === "c++" ? "cpp" : language[0],
            content: code,
          },
        ],
        stdin: "",
      })
      .then((response) => {
        // console.log(response.data.run);
        setErr(response.data.run.stderr);
        setOutput(response.data.run.output)
      })
      .catch((error) => {
        console.log("there was an error while runnign the code", error);
      });

    setLoading(false);
  };

  console.log(err, output)

  return (
    <div className="w-[90%] mx-auto p-1 rounded-md h-full bg-slate-50 dark:bg-white/4">
      <div className="p-3 rounded-md flex items-center w-full">
        <div className="">
          <Select
            onValueChange={(value) => {
              const [lang, ver] = value.split(" ");
              setLanguage([lang, ver]);
              setCode(lang === "c++" ? starterCode["cpp"] : starterCode[lang]); // set starter code
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
                    >{`${elem.language} - ${elem.version}`}</SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mx-auto pr-[15%] flex items-center justify-center gap-2">
          <p className="px-2 text-sm font-bold"> Participants: 3</p>
          <Button
            size="lg"
            variant="personal"
            className="mx-auto cursor-pointer"
            onClick={() => {
              HandleSubmitRequest();
            }}
          >
            {loading ? <Loader /> : <p>Run Code</p>}
          </Button>
          <div className="pl-5">
            <Clock />
          </div>
        </div>
        <Switch
          id="darkThemeToggler"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            setTheme((prev) => !prev);
          }}
          className="cursor-pointer"
        />
      </div>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[500px] max-w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={75}>
          <div className="h-full">
            <span className="font-semibold">
              <div className="border-2">
                <Editor
                  height={"100vh"}
                  width={"100vw"}
                  language={language[0] === "c++" ? "cpp" : language[0]}
                  value={code}
                  theme={theme == 0 ? "light" : "vs-dark"}
                  onMount={handleEditorMount}
                  onChange={(change) => setCode(change)}
                />
              </div>
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={25}
          className="border-t-3 border-cyan-500 dark:border-white"
        >
          <div className=" h-full p-6">
            <span className="font-semibold">Output</span>
            <div className="mt-4 font-[Inter] tracking-tight text-sm">
              {
                err ? <p className="text-red-500 pr-20"> {err} </p> : <p className="pr-20"> {output} </p>
              }
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorLayout;
