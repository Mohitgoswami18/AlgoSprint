import { useEffect, useState } from "react";
import { FaRestroom } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { Label } from "@/components/ui/label";
import Loader from "../Loader"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate, useParams }  from "react-router-dom";
import axios from "axios";

const CodingRooms = () => {
  const [activeCard, setActiveCard] = useState("create");
  const [username, setUsername] = useState("");
  const[loading, setLoading] = useState(false);
  const [roomid, setRoomid] = useState("");

  const timeMapping = {
      rapid: 3600,
      flash: 1800,
      classical: 7200,
    };
  
  
  const [settings, setSettings] = useState({
    playStyle: "rapid",
    numberOfProblems: 2,
    time: timeMapping["rapid"],
  });
  const params = useParams();
  const realUsername = params.username;
  console.log(realUsername)
  const navigate = useNavigate();

  const handleUuid = () => {
    const id = uuid();
    setRoomid(id);
  };

  const handleCreateLogic = async() => {
    if (!username || !roomid) {
      toast.error("Please enter a username and room ID");
      return;
    }

    setLoading(true);
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/rooms/createNewRoom",
      {
        roomCode: roomid,
        username: realUsername,
        style: settings.playStyle,
      }
    );
    
    console.log(response)
    setLoading(false);

    if (response.data.message !== "Room Created Successfully") {
      toast.error("Ther was some error PLease try again");
      return;
    }


    navigate(`/codingroom/${roomid}/lobby`, {
      state: { realUsername, username, settings, redirectedFrom: "codingRoom" },
    });
  }

  const handleJoinLogic = async () => {
    if (!username || !roomid) {
      toast.error("Please enter a username and room ID");
      return;
    }

    const response = await axios.post("http://localhost:8000/api/v1/user/rooms/joinRoom",
      {
        roomCode: roomid,
        username: realUsername
      }
    );

    if (response.data.message !== "Room joined successfully") {
      console.log(response.data.message);
      toast.error("there was some error while joining the room try again later");
      return;
    }
      navigate(`/codingroom/${roomid}/lobby`, {
        state: {
          realUsername,
          username,
          settings,
          redirectedFrom: "codingRoom",
        },
      });
  }

  return (
    <div className="bg-slate-50 transition-all duration-500 dark:bg-black font-[Inter] p-5 h-screen relative">
      <div className=" backdrop-blur-2xl bg-white/10 p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-slate-100 shadow-md dark:bg-white/10 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            <FaRestroom />
          </div>
          <div className="">
            <h1 className="text-xl font-[Inter] text-black dark:text-white font-bold">
              Coding Room
            </h1>
            <p
              className={`text-[#4a5568]  dark:text-[#A0AEC0] text-[12px] tracking-tight w-2/3 `}
            >
              Challenge and compete with your friends and college and experience
              a whole different level of competene through personalised coding
              rooms
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-4 gap-4 h-[80%] transition-all">
        <div
          onClick={() => setActiveCard("create")}
          className={`flex-1 flex flex-col justify-center items-center px-12 rounded-lg shadow-lg cursor-pointer transition-all duration-500
          ${activeCard === "create" ? "flex-[4]" : "flex-[1]"} 
          bg-white text-black dark:text-white dark:bg-white/4 hover:dark:bg-white/6 hover:bg-blue-100`}
        >
          <h2 className="text-2xl font-bold mb-4">Create Room</h2>
          <div
            className={`text-center    ${
              activeCard === "create" ? "inline" : "hidden"
            }`}
          >
            <p className={`text-center`}>
              Create your own personalised room and invite friends to compete
              and grow together in an competetive environment
            </p>

            <div className="flex flex-col mt-12">
              <div className="flex p-2 items-center gap-2">
                <label htmlFor="name" className="text-md">
                  username
                </label>
                <Input
                  id="name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="enter space name"
                  required
                />
              </div>
              <div className="flex p-2 items-center gap-2">
                <label htmlFor="name" className="w-[20%] text-md">
                  room id
                </label>
                <Input
                  id="roomid"
                  type="text"
                  value={roomid}
                  onChange={(e) => setRoomid(e.target.value)}
                  placeholder="enter space id"
                  required
                  className="px-2"
                />
              </div>

              <p className="text-[12px] mt-6">
                genrate a random id
                <span
                  className="text-cyan-500 cursor-pointer underline"
                  onClick={() => {
                    handleUuid();
                  }}
                >
                  here
                </span>
              </p>
              <div className="flex items-center justify-between gap-2">
                <Dialog className="">
                  <DialogTrigger asChild>
                    <p className="bg-zinc-300 dark:bg-white/10 p-2 mt-3 w-full rounded-md">
                      Customize settings
                    </p>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">
                        Game Settings
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                      <Label>PlayStyle</Label>
                      <Select
                        onValueChange={(value) =>
                          setSettings({ ...settings, playStyle: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose PlayStyle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Flash">Flash - 30 mins</SelectItem>
                          <SelectItem value="Rapid">Rapid - 1Hrs</SelectItem>
                          <SelectItem value="Classical">
                            Classical - 2 hrs
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Problems</Label>
                      <Select
                        onValueChange={(value) =>
                          setSettings({ ...settings, numberOfProblems: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose Number of Problems" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full mt-4 rounded-2xl shadow-md">
                      Save Settings
                    </Button>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="personal"
                  className="w-1/2 mt-4"
                  onClick={() => handleCreateLogic("create")}
                >
                  {loading ? <Loader /> : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setActiveCard("join")}
          className={`flex-1 flex flex-col justify-center items-center px-12 rounded-lg shadow-lg cursor-pointer transition-all duration-500
          ${activeCard === "join" ? "flex-[4]" : "flex-[1]"} 
          bg-blue-600 text-white hover:bg-blue-700`}
        >
          <h2 className="text-2xl font-bold mb-4">Join Room</h2>
          <div
            className={`text-center transition-all   ${
              activeCard === "join" ? "inline" : "hidden"
            }`}
          >
            <p className={`text-center`}>
              Join any public room by entering room id and start competing with
              your friends in a competetive environment
            </p>

            <div className="flex flex-col mt-12">
              <div className="flex p-2 items-center gap-2">
                <label htmlFor="name" className="text-md">
                  username
                </label>
                <Input
                  id="name"
                  className="placeholder:text-white"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="enter space name"
                  required
                />
              </div>
              <div className="flex p-2 items-center gap-2">
                <label htmlFor="name" className="w-[20%] text-md">
                  room id
                </label>
                <Input
                  id="roomid"
                  type="text"
                  value={roomid}
                  onChange={(e) => setRoomid(e.target.value)}
                  placeholder="enter space id"
                  required
                  className="px-2  placeholder:text-white"
                />
              </div>

              <p className="text-[12px] mt-6">
                Don't have a room id?
                <span
                  className="text-cyan-500 cursor-pointer underline"
                  onClick={() => {
                    setActiveCard("create");
                  }}
                >
                  Try creating a room
                </span>
              </p>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  handleJoinLogic(username, "join");
                }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingRooms;
