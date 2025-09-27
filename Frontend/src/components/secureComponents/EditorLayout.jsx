import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import Loader from "../Loader";
import Avatar from "react-avatar";
import { toast } from "sonner";
import { initialiseSocket } from "../../socket.io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Clock from "../Clock";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const [language, setLanguage] = useState([]);
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [code, setCode] = useState(starterCode[language]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [theme, setTheme] = useState(false)
  const [output, setOutput] = useState("");
  const editorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const socketRef = useRef();
  const [users, setUsers] = useState([]);
  const isRemoteChange = useRef(false);

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

    const username = location.state?.username;
    const roomid = param.roomid;

    if (!username || !roomid) {
      toast.error("Enter a username");
      navigate("/user/collaborativerooms", { replace: true });
    } else {
      const connectToSockets = async () => {
        socketRef.current = await initialiseSocket();

        const handleError = (err) => {
          console.log("socket error", err);
          toast.error("Socket connection failed, try again later");
          navigate("/user/collaborativerooms", { replace: true });
        };

        socketRef.current.on("connect_error", handleError);
        socketRef.current.on("connect_failed", handleError);

        socketRef.current.emit("join", { username, roomid });

        socketRef.current.on(
          "connected",
          ({ connectedUsers, user, socketId }) => {
            const updatedConnectedUsers = connectedUsers.map((user) => ({
              ...user,
              avatar: (
                <Avatar name={user.username} size="40" className="rounded-md" />
              ),
            }));

            setUsers(updatedConnectedUsers);

            if (user === username) {
              toast.success("Joined the room successfully!");
            } else {
              toast.success(`${user} joined the room`);
            }
          }
        );

        socketRef.current.on("user-disconnected", ({ username, socketId }) => {
          setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
          toast.success(`${username} left the room`);
        });
      };
      connectToSockets();
    }

    return () => {
      socketRef.current.emit("leave", { username, roomid });
      socketRef.current.disconnect();
    };
  }, []);

  const handleRemoteCodeChange = ({ code }) => {
  if (code !== editorRef.current.getValue()) {
    isRemoteChange.current = true;
    editorRef.current.setValue(code);
    setCode(code);
    isRemoteChange.current = false;
  }
};

useEffect(() => {
  if (!socketRef.current) return;
  socketRef.current.on("code-change", handleRemoteCodeChange);

  socketRef.current.on("langChanged", ({lang, ver}) => {
    setLanguage([lang, ver]);

  });

  socketRef.current.on("codeOutput", ({output, err}) => {
    setOutput(output);
    setErr(err);
  });

  return () => {
    socketRef.current.off("code-change", handleRemoteCodeChange);
  };
}, [socketRef.current]);

  const handleCodeChange = (newCode) => {
    if (isRemoteChange.current) return;
    setCode(newCode);
    socketRef.current.emit("change", { roomid: param.roomid, code: newCode });
  };

  const HandleSubmitRequest = async () => {

    if(language.length <= 0) {
      toast.error("Please select a language first.");
      setLoading(false);
      return;
    }
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
        setErr(response.data.run.stderr);
        setOutput(response.data.run.output);

        socketRef.current.emit("codeOutput", {
          roomid: param.roomid,
          output: response.data.run.output,
          err: response.data.run.stderr,
        });
      })
      .catch((error) => {
        console.log("there was an error while runnign the code", error);
      });

    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 justify-between px-2 font-[Inter]">
      {/* Left Section of the collaborative screen */}
      <div className="w-[20%] justify-between py-4 flex flex-col gap-2 rounded-md bg-slate-200 dark:bg-white/4 h-screen text-2xl px-2 font-bold pt-8">
        <div>
          <h1>Members</h1>
          <div className="mt-4">
            {users.map((elem, idx) => (
              <div
                className="p-2 text-sm gap-2 dark:text-white flex items-center"
                key={idx}
              >
                <p>{elem.avatar}</p>
                <p>{elem.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="m-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share Room Id</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Share Room Id</DialogTitle>
                <DialogDescription>
                  Anyone who has this Room Id can join the room.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={param.roomid} readOnly />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            className="m-1"
            variant="destructive"
            onClick={() => {
              toast.success("Leaved the room successfully!");
              navigate(`/${username}/collaborativerooms`, { replace: true });
            }}
          >
            Leave
          </Button>
        </div>
      </div>

      {/* Right Section of the collaborative screen */}
      <div className="w-[80%] p-1 rounded-md h-full bg-slate-50 dark:bg-white/4">
        <div className="py-3 rounded-md flex items-center w-full">
          <div className="">
            <Select
              onValueChange={(value) => {
                const [lang, ver] = value.split(" ");
                setLanguage([lang, ver]);
                setCode(
                  lang === "c++" ? starterCode["cpp"] : starterCode[lang]
                );
                handleCodeChange(
                  lang === "c++" ? starterCode["cpp"] : starterCode[lang]
                );

                socketRef.current.emit("langChange", {
                  roomid: param.roomid,
                  lang,
                  ver,
                });
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
            <p className="px-2 text-sm font-bold">
              Participants: {users.length}
            </p>
            <Button
              size="sm"
              variant="personal"
              className="mx-auto cursor-pointer text-sm font-bold w-24"
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
          <div className="gap-2 flex justify-center items-center">
            <CiLight
              className={`text-2xl ${
                theme === false
                  ? "text-yellow-600 "
                  : " "
              }`}
            />
            <Switch
              id="darkThemeToggler"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setTheme((prev) => !prev);
              }}
              className="cursor-pointer"
            />
            <CiDark
              className={`text-2xl ${
                theme === true
                  ? "text-cyan-600 "
                  : " "
              }`}
            />
          </div>
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
                    theme={"vs-dark"}
                    onMount={handleEditorMount}
                    onChange={(newCode) => handleCodeChange(newCode)}
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
                {err ? (
                  <p className="text-red-500 pr-20"> {err} </p>
                ) : (
                  <p className="pr-20"> {output} </p>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default EditorLayout;
