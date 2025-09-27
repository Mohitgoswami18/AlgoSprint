import { GiMultipleTargets } from "react-icons/gi";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid";
import { useState } from "react"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import javaLogo from "../../assets/images/javaLogo.png";
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
import Loader from "../Loader"
import {useUser} from "@clerk/clerk-react"

const McqRooms = () => {

  const params = useParams();
  const navigate = useNavigate();
  const realUsername = params.username;
  const [roomid, setRoomid] = useState("");
  const [loading, setLoading] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const user = useUser();
  const [joinLoading, setJoinLoading] = useState(false);
  const handleUuid = () => {
    const id = uuid();
    return id;
  };

  if (!user) {
    return;
  }
 if (user.user.username !== realUsername) {
   console.log("Not your component you are being redirected...");
   navigate(`/${user.user.username}/codingrooms`);
 }

  
  const quizList = [
    {
      name: "C++",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/cplusplus/00599C",
    },
    {
      name: "Java",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: javaLogo,
    },
    {
      name: "JavaScript",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      name: "Python",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/python/3776AB",
    },
    {
      name: "C",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/c/00599C",
    },
    {
      name: "PHP",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/php/777BB4",
    },
    {
      name: "Go",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/go/00ADD8",
    },
    {
      name: "SQL",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/mysql/4479A1",
    },
    {
      name: "Mongo DB",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/mongodb/47A248",
    },
    {
      name: "Data Structures",
      Questions: "20",
      time: "20 minutes",
      reward: "15xp",
      imageURL: "https://cdn.simpleicons.org/leetcode/F89F1B",
    },
  ];

  const handleCreateLogic = async (event, idx) => {

    setLoading((prev) => prev.map((elem, index) => (
      index === idx ? true : false
    )));
    const roomid = handleUuid();

    if (!realUsername || !roomid) {
      toast.error("Please enter a username and room ID");
      return;
    }

    console.log("topic is", event)

    const response = await axios.post(
      "https://algosprint-vxi4.onrender.com/api/v1/user/mcqrooms/createmcqroom",
      {
        roomCode: roomid,
        username: realUsername,
        topic: event,
      }
    );

    setLoading([false, false, false, false, false, false, false, false]);

    if (response.data.message !== "Room Created Successfully") {
      toast.error("Ther was some error PLease try again");
      return;
    }

    setLoading(false)

    navigate(`/mcq/${roomid}/lobby`, {
      state: { username: realUsername, topic: event, time:1200 },
    });
  }

  const handleJoinLogic = async () => {
    setJoinLoading(true);

    if (!realUsername || !roomid) {
      toast.error("Please enter a username and room ID");
      setLoading(false)
      return;
    }
    
    const response = await axios.post(
      "https://algosprint-vxi4.onrender.com/api/v1/user/mcqrooms/joinmcqroom",
      {
        roomCode: roomid,
        username: realUsername,
      }
    );
    
    if (response.data.message !== "Room joined successfully") {
      toast.error("there was some error while joining the room try again later");
      setLoading(false)
      return;
    }

    setJoinLoading(false);
    navigate(`/mcq/${roomid}/lobby`, {
      state: { username:realUsername, time: "20 Mins" },
    });
  }

  return (
    <div className="bg-slate-50 transition-all duration-500 dark:bg-black/80 text-black dark:text-white font-[Inter] p-5">
      <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md p-5 rounded-md">
        <div className="flex gap-4 items-center">
          <div className="dark:bg-[#222] transition-all duration-500 bg-slate-100 text-black dark:text-white shadow-md px-2 py-2 text-4xl rounded-xl">
            <GiMultipleTargets />
          </div>
          <div>
            <h1 className="text-xl font-bold text-black dark:text-white">
              MCQ Rooms - Quiz Arena
            </h1>
            <p className="text-zinc-600 dark:text-white text-sm">
              Test your theoretical knowledge with rapid-fire MCQ rounds with
              your friends
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-center font-bold text-2xl text-black dark:text-white pt-10">
        Join Public Room
      </h1>

      <div className="mx-auto flex items-center justify-center mt-4">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline">Join</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Join room</DialogTitle>
                <DialogDescription>
                  enter room id to join the room
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">roomid</Label>
                  <Input
                    id="roomid"
                    value={roomid}
                    onChange={(e) => setRoomid(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => handleJoinLogic()}
                >
                  {joinLoading ? <Loader /> : <p>join</p>}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <div className="border-t-2 border-cyan-400 w-full my-6 border-dashed"></div>

      <div className="flex items-center mt-6 text-2xl font-bold justify-center gap-4 text-black dark:text-white">
        Create your room
      </div>
      <div className="flex items-center transition-all duration-500 flex-wrap max-w-[900px] mx-auto p-4">
        {quizList.map((elem, idx) => (
          <div
            key={idx}
            className="flex  px-4 flex-col basis-[48%] border transition-all duration-500 border-white/20 p-2 bg-slate-20 shadow-md ring-2 dark:ring-0 ring-slate-200 dark:bg-[#1a1a1a] m-2 rounded-md"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h1 className="text-black dark:text-white font-bold m-2">
                  {elem.name}
                </h1>
                <div className="flex items-center gap-4 text-xs m-2">
                  <p>{elem.Questions} questions</p>
                  <p className="font-bold">{elem.time}</p>
                </div>
                <div className="text-black dark:text-white text-xs m-2">
                  *{elem.reward}
                </div>
                <div className="w-full flex mt-4 gap-4 items-center justify-start">
                  <Button
                    size="sm"
                    className="w-24"
                    variant="personal"
                    onClick={() => handleCreateLogic(elem.name, idx)}
                  >
                    {loading[idx] ? <Loader></Loader> : <p>create</p>}
                  </Button>
                </div>
              </div>
              <div className="w-15">
                <img src={elem.imageURL} className="" alt={elem.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default McqRooms;
