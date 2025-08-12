import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
export default function Signin() {
  return (
    <div className="flex font-[Inter] min-h-screen items-center justify-center bg-slate-50 dark:bg-black px-1 ">
      <div className="w-full max-w-sm ring-[0.5px] dark:ring-zinc-600 rounded-md bg-white dark:bg-slate-900 px-8 pt-2 shadow-lg pb-2">
        <img src={logo} alt="" className="w-8 mx-auto" />
        <p className="mt-1 text-[12px] text-center text-gray-500 dark:text-gray-400">
          Sign in or create an account to continue
        </p>

        {/* Email Input */}
        <div className="mt-6 flex items-center justify-center">
          <label
            htmlFor="email"
            className="block text-[12px] w-1/2 font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full text-[12px] rounded-lg border border-gray-300 bg-white dark:bg-slate-800 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="username or email"
          />
        </div>

        {/* Password Input */}
        <div className="mt-2 flex items-center justify-center">
          <label
            htmlFor="password"
            className="block w-1/2 text-[12px] font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full text-[12px] rounded-lg border border-gray-300 bg-white dark:bg-slate-800 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="w-full cursor-pointer text-[12px] rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition">
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className=" flex items-center my-2">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Social Login */}
        <button className="w-full flex items-center cursor-pointer justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
          <img
            src="/google-icon.svg"
            alt="Google"
            className="w-5 h-3 text-[12px]"
          />
          Continue with Google
        </button>

        <p className="text-[12px] text-center mt-1">
          already have an account{" "}
          <NavLink to={"/signin"} className="text-indigo-500">
            {" "}
            sign in{" "}
          </NavLink>
        </p>
      </div>
    </div>
  );
}
