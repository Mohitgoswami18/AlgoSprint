import { RiUserCommunityFill } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const CollaborativeRooms = () => {

  const [username, setUsername] = useState("")
  const [roomid, setRoomid] = useState("")

  const handleUuid = () => {
    const id = uuid();
    setRoomid(id)
  }

  const navigate = useNavigate();
  console.log(roomid);
  

  const HandleJoin = () => {
    navigate(`/room/${roomid}` , {
      state: { username },
    })

  }

  return (
    <div className="bg-slate-50 transition-all duration-500 dark:bg-black h-screen text-black dark:text-white font-[Inter] p-5">
      <div className=" backdrop-blur-2xl bg-white/10 p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-white/10 backdrop-blur-2xl px-2 py-3 text-5xl rounded-xl">
            <RiUserCommunityFill />
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-black dark:text-white">
              Collaborative verse
            </h1>
            <p className="text-zinc-600 dark:text-white text-[12px] tracking-tight w-2/3">
              enters an collaborative space for sharing codes questions concepts
              and learning together with your friends
            </p>
          </div>
        </div>
      </div>

      <div className="dark:bg-black transition-all duration-500 ease-in-out w-full mt-4 px-8 font-[Inter] p-5 grid place-items-center">
        <div className="flex items-center transition-all duration-500 p-2 justify-center gap-3 w-full max-w-[900px] mx-auto">
          <div className="w-full transition-all flex flex-col items-center justify-center duration-500 text-black dark:text-whiteackdrop-blur-2xl text-center rounded-md">
            <Card className="w-lg hover:scale-105 shadow-md bg-slate-200/10 transition-all duration-500 dark:bg-[#111] ">
              <CardHeader>
                <CardTitle className="text-center font-bold text-2xl p-1">
                  Create or join a collaborative space
                </CardTitle>
                <CardDescription>
                  enter a room id to join other collaborative space or create
                  your owns and invite your firends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col mt-4">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="name" className="text-md">
                        username
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value = {username} 
                        onChange = {(e) => setUsername(e.target.value)}
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
                        value = {roomid}
                        onChange = {(e) => setRoomid(e.target.value)}
                        placeholder="enter space id"
                        required
                        className="px-2"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2 mt-4">
                <p className="text-[12px]">
                  Don't have a room id? <span className="text-cyan-500 cursor-pointer underline" 
                  onClick={handleUuid}>create new id</span>
                </p>
                <Button variant="personal" className="w-full"
                onClick={HandleJoin}>
                  join
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeRooms;
