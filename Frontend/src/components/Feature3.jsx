import whiteDashboard from "../assets/images/whiteDashboard.png"
import darkDashboard from "../assets/images/darkDashboard.png"
import logo from "../assets/images/logo.png"
const Feature3 = () => {
  return (
    <div className="bg-slate-50 mt-4 transition-all duration-500 dark:bg-black font-[Inter] pt-22">
      <h1 className="text-4xl font-bold text-center text-[#1a202c] dark:text-[#F7FAFC]">
        Personalised Dashboard
      </h1>
      <p className="text-md text-[#1a202c] text-center dark:text-[#F7FAFC] font-[Inter]">
        Keep a track of your progress with you ownpersonalised dashboard{" "}
      </p>

      <div className="flex items-center justify-center p-4 mt-10">
        <div className="w-1/2 p-[0.5px] relative bg-white/30 border-2 rounded-lg">
          <img
            src={darkDashboard}
            alt=""
            className="w-full rounded-md shadow-xl"
          />
          <img
            src={whiteDashboard}
            alt=""
            className="w-3/4 absolute bottom-[-60px] shadow-xl right-[-60px] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Feature3;
