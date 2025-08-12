import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRestroom } from "react-icons/fa6";

import { Input } from "@/components/ui/input";

const CodingRooms = () => {
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
            <p className=" text-[#4a5568] dark:text-[#A0AEC0] text-[12px] tracking-tight w-2/3">
              Challenge and compete with your friends and college and experience
              a whole different level of competene through personalised coding
              rooms
            </p>
          </div>
        </div>
      </div>

      <div className="dark:bg-black transition-all duration-500 w-full mt-10 font-[Inter] p-5 grid place-items-center">
        <div className="flex items-center p-2 justify-center gap-3 w-full max-w-[900px] mx-auto">
          <div className="dark:bg-[#33] basis-[48%] transition-all flex flex-col items-center justify-center duration-500 text-black dark:text-whiteackdrop-blur-2xl text-center hover:scale-105 rounded-md">
            <Card className="w-full max-w-sm transition-all duration-500 dark:bg-[#111] ">
              <CardHeader>
                <CardTitle className="text-center font-bold text-2xl p-1">
                  Create Your Room
                </CardTitle>
                <CardDescription>
                  genrate a random code and share it with other so that they can
                  join Public Room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="name" className="text-md w-1/2 ">
                        Room id
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter room id"
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
          <div className=" basis-[48%] transition-all flex flex-col items-center justify-center duration-500 text-black dark:text-white backdrop-blur-2xl text-center hover:scale-105 rounded-md">
            <Card className="w-full max-w-sm transition-all duration-500 dark:bg-[#111]">
              <CardHeader>
                <CardTitle className="text-center font-bold text-2xl p-1">
                  Join public Room
                </CardTitle>
                <CardDescription>
                  Enter the room id and Room of others
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

export default CodingRooms;
