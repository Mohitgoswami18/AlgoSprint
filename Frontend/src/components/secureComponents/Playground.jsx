import { useState, useEffect } from "react";
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
import Clock from "../Clock";
import axios from "axios";

const Playground = () => {
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);

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
  return (
    <div>
      <div className="py-3 rounded-md flex items-center w-full">
        <div className="">
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
                    >{`${elem.language} - ${elem.version}`}</SelectItem>
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
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Playground;
