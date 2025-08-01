import logo from "../assets/images/logo.png";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <div className="p-2 px-4 bg-[#0d1b2a] shadow-sm shadow-black flex item-center justify-between">
      <div className=" w-fit rounded-2xl flex gap-4 items-center justify-center">
        <img src={logo} alt="" className="w-12" />
        <div className="text-[#F7FAFC]">
          <h1 className="  font-bold">AlgoSprint</h1>
          <h2 className="text-[10px] text-[#A0AEC0] font-semibold tracking-tight">
            Dominate coding rooms
          </h2>
        </div>
      </div>

      <div className="gap-5 flex justify-center items-center">
        <Button variant="ghost" size="sm">
          ☀️
        </Button>
        <Button variant="outline" size="sm">sign up</Button>
      </div>
    </div>
  );
}

export default Navbar
