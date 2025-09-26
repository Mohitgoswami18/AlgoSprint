import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom"

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        bg-gradient-to-r 
        from-cyan-500/20 via-violet-600/10 to-purple-500/20
        dark:from-zinc-800 dark:via-violet-600/10 dark:to-cyan-500/30
        rounded-2xl shadow-xl font-[Inter] mx-4 md:mx-auto my-20 max-w-5xl p-10 text-center
        backdrop-blur-lg border border-black/10 dark:border-white/10
        bg-slate-50 dark:bg-black
      "
    >
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
        Ready to Gamify Your Coding?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
        Dive into a whole new way of practicing DSA with friends, challenges,
        real-time rooms, and competitive vibes. Whether you’re prepping for
        interviews or just love coding — make it fun.
      </p>
      <div className="flex flex-col w-[30%] mx-auto sm:flex-row items-center justify-center gap-4">
        <Button
          variant="personal"
          size="lg"
          className="w-full font-semibold shadow-md"
          onClick={() => navigate("/auth/signup")}
        >
          Create a Room
        </Button>
      </div>
    </section>
  );
};

export default CTA;
