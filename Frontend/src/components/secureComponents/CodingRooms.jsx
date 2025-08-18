import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRestroom } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CodingRooms = () => {

  const [settings, setSettings] = useState({
    time: "1hr",
    problems: "5",
    level: "medium",
  });

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

      <div className="dark:bg-black transition-all duration-500 w-full mt-6 font-[Inter] p-5 grid place-items-center">
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
                  <div className="flex p-2 items-center gap-2">
                    <label htmlFor="name" className="text-md w-1/4 text-left">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter room Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="id" className="text-md w-1/4 text-left ">
                        Room id
                      </label>
                      <Input
                        id="id"
                        type="text"
                        placeholder="Enter room id"
                        required
                      />
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <p className="underline text-sm cursor-pointer">
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
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose PlayStyle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30min">
                              Flash - 30 mins
                            </SelectItem>
                            <SelectItem value="1hr">Rapid - 1Hrs</SelectItem>
                            <SelectItem value="3hr">
                              Classical - 2 hrs
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Number of Problems</Label>
                        <Select>
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

                      <div className="space-y-2">
                        <Label>Difficulty </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">
                              easy
                            </SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="hard">
                              hard
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full mt-4 rounded-2xl shadow-md">
                        Save Settings
                      </Button>
                    </DialogContent>
                  </Dialog>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2 w-full mt-10 justify-around">
                <div className="w-full flex items-center justify-center gap-2">
                  <Button className="w-1/2" size="sm">
                    Genrate Code
                  </Button>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this code can join your room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="code" className="sr-only">
              code
            </Label>
            <Input
              id="code"
              defaultValue="5127326"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

                </div>
                <Button className="w-full "> Join Room</Button>
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
                  <div className="flex flex-col">
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="name" className="text-md w-1/4">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="enter space name"
                        required
                      />
                    </div>
                    <div className="flex p-2 items-center gap-2">
                      <label htmlFor="code" className="text-md w-1/4">
                        Room id
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
