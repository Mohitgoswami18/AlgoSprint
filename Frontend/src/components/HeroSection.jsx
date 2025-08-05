import { Button } from "@/components/ui/button";
import Eye from "./Eyepart"
import terminal from "../assets/images/terminal.png"

const HeroSection = () => {
  return (
    <div className="bg-[#0e1d2e] font-[Inter] pt-24 px-6 flex items-center justify-between">
      <div className="">
        <div className="rounded-xl bg-white/10 w-fit py-1 text-[12px] px-2 text-[#A0AEC0]">
          🐦‍🔥 join and compete in coding rooms
        </div>
        <h1 className="text-4xl my-4  font-bold text-[#F7FAFC]">
          Code, Compete, Conquer !
        </h1>
        <p className=" my-2 tracking-tighter text-[#A0AEC0] w-2/5">
          master programming concepts through epic battles, set the rules, and
          climb on the leaderboard.
        </p>
        <div className="flex items-center justify-start gap-4 border-l-2 border-b-2 p-2 w-2/5">
          <Button>start your journey 👑</Button>
          <Button> Explore ➡️</Button>
        </div>
      </div>
      <div className=" border-2 shadow-md relative rounded-md mr-8">
        <div className="absolute top-1/2 left-1/2 translate-[-50%]">
          <Eye />
          <p></p>
        </div>
        <img src={terminal} alt="" className="rounded-md" />
      </div>
    </div>
  );
}

export default HeroSection
