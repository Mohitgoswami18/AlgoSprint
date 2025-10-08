import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Eye from "./Eyepart";

const HeroSection = ({featureRef}) => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  const HandlePrimaryButton = () => {
    if (!isLoaded) return;

    if (isSignedIn) {
      navigate(`/${user.username}/dashboard`);
    } else {
      navigate("/auth/signup");
    }
  };

  const scrollToTheFeatures = (ref) => {
    ref.current?.scrollIntoView({
      behavior:"smooth",
      block: "start"
    })
  }

  return (
    <div className="transition-all duration-500 ease-in-out pt-7 px-8 flex flex-col items-center bg-slate-50 dark:bg-black font-[Inter] relative overflow-hidden">
      <div className="relative flex justify-center w-1/10 max-w-[600px]">
        <Eye className="w-full" />
      </div>

      <h1 className="text-6xl md:text-7xl text-center px-[10%] font-bold text-gray-900 dark:text-[#F7FAFC]">
        Gamify your coding Journey Level Up Your Coding Skill
      </h1>
      <p className="mt-4 tracking-tight text-lg max-w-3xl text-center text-gray-600 dark:text-[#A0AEC0]">
        Challenge you Friends for an intense 1v1 coding duels.Solve challenges,
        earn ranks, and sharpen your problem-solving skills. Track your stats,
        unlock achievements, and climb the leaderboard. Compete in the ultimate
        coding arena.
      </p>

      {/* Buttons */}
      <div className="flex items-center transition-all duration-500 justify-center gap-4 border-b-2 p-6 px-16 border-gray-300 dark:border-[#A0AEC0] mt-6">
        {isLoaded ? (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button
                className="relative group overflow-hidden px-6 py-3 rounded-md bg-cyan-600 text-white text-lg sm:text-xl font-semibold transition-all duration-300"
                onClick={HandlePrimaryButton}
              >
                <div className="absolute top-0 left-0 w-0 h-full bg-zinc-300 transition-all duration-300 group-hover:w-full z-10"></div>

                <span className="relative z-20 group-hover:text-black transition-colors duration-300">
                  {isSignedIn ? "Continue to Dashboard" : "Start Your Journey"}
                </span>
              </button>

              <Button
                variant="outline"
                className="cursor-pointer px-6 py-3 text-lg sm:text-xl transition-all duration-300"
                onClick={() => scrollToTheFeatures(featureRef)}
              >
                Explore ➡️
              </Button>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-300" />
            <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-300" />
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
