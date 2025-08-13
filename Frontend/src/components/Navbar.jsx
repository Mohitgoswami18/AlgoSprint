import logo from "../assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="transition-all duration-500 ease-in-out p-3 px-4 bg-slate-50 dark:bg-black border-b border-gray-300 dark:border-gray-700 backdrop-blur-md shadow-md flex items-center justify-between">
      {/* Logo Section */}
      <div className="w-fit rounded-2xl flex gap-4 items-center justify-center">
        <img src={logo} alt="logo" className="w-12 drop-shadow-md" />
        <div className="text-gray-900 dark:text-gray-100">
          <h1 className="text-xl font-bold tracking-tight">AlgoSprint</h1>
          <h2 className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold tracking-wide">
            Dominate coding rooms
          </h2>
        </div>
      </div>

      {/* Controls Section */}
      <div className="gap-4 flex justify-center items-center">
        <Switch
          id="darkThemeToggler"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
          className="cursor-pointer"
        />
        <label
          htmlFor="darkThemeToggler"
          className="text-gray-800 dark:text-gray-200 text-sm font-medium"
        >
          Dark Mode
        </label>

        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-600"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
