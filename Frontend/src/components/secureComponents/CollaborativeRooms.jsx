import { RiUserCommunityFill } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const CollaborativeRooms = () => {
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

      <div className="dark:bg-black transition-all duration-500 ease-in-out w-full mt-10 font-[Inter] p-5 grid place-items-center">
        <div className="flex items-center transition-all duration-500 p-2 justify-center gap-3 w-full max-w-[900px] mx-auto">
          <div className=" basis-[48%] transition-all flex flex-col items-center justify-center duration-500 text-black dark:text-whiteackdrop-blur-2xl text-center hover:scale-105 rounded-md">
            <Card className="w-full max-w-sm transition-all duration-500 dark:bg-[#111] ">
              <CardHeader>
                <CardTitle className="text-center font-bold text-2xl p-1">
                  Create Your Space
                </CardTitle>
                <CardDescription>
                  genrate a random code and share it with other so that they can
                  join thier space
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="name" className="text-md">
                        name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="enter space name"
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full">Genrate Code</Button>
                <Button type="submit" className="w-full">
                  share
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="transition-all duration-500 basis-[48%] flex flex-col items-center justify-center text-black dark:text-white backdrop-blur-2xl text-center hover:scale-105 rounded-md">
            <Card className="w-full max-w-sm transition-all duration-500 dark:bg-[#111]">
              <CardHeader>
                <CardTitle className="text-center font-bold text-2xl p-1">
                  Join public Space
                </CardTitle>
                <CardDescription>
                  Enter the random code and Enter space of others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="code" className="text-md">
                        code
                      </label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="enter space name"
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Join
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
