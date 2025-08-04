import logo from "../assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const handleSignUp = () => {}
  return (
    <div className="p-3 px-4 bg-[#0d1b2a] shadow-xl shadow-black flex item-center justify-between">
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
          <Switch
          id="darkThemeToggler"
          onClick={() => {
            setTheme((prev) => (prev === "light" ? "dark" : "light")),
              console.log(theme);
          }}
          className="cursor-pointer"
          /> 

          <label htmlFor="darkThemeToggler">Dark Mpde</label>
        <Button variant="outline" size="sm" className="cursor-pointer"
        onClick={handleSignUp}>
          sign up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
