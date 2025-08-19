import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSignIn} from "@clerk/clerk-react";
import google from "../assets/images/google.png";
import { toast } from "sonner";
import Loader from "./Loader"

export default function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { signIn, setActive, isLoaded } = useSignIn();
    const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn
      .authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/user/",
      })
      .then(() => toast.success("Login Successfully !"))
      .catch(() => toast.error("Login Failed !"))
      .finally(() => setGoogleLoading(false));
  }

  const handleSignIn = async() => {
    setLoading(true);
    if(!isLoaded) return;

    try {
      const signinResult = await signin.create({
        identifier: email,
        password: password,
      });

      if(signinResult.status === "complete") {
        setActive(signinResult.createdSessionId);
        toast.success("Sign-in successful! Redirecting...");
      } else {
        toast.error("Sign-in incomplete. Please check your credentials.");
        setError("Sign-in failed. Please check your credentials.");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      setError("Failed to sign in. Please try again.");
      console.error("Sign-in error:", error);
      setLoading(false);
    }
  }

  return (
    <div className="flex font-[Inter] items-center justify-center bg-slate-50 dark:bg-black px-1 ">
      <div className="w-full max-w-sm ring-[0.5px] dark:ring-zinc-600 rounded-md bg-white dark:bg-zinc-900 backdrop-blur-2xl px-8 pt-2 shadow-lg pb-2">
        <h1 className="text-center font-[Inter] mt-2 text-3xl font-bold text-gray-900 dark:text-[#F7FAFC]">
          Welcome to AlgoSprint
        </h1>
        <p className="text-md text-center text-gray-500 dark:text-gray-400">
          Sign in or create an account to continue
        </p>

        <form onSubmit={handleSignIn}>
          <div className="mt-12 my-4 flex items-center justify-center">
            <label
              htmlFor="email"
              className="block text-md w-1/2 font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username or email"
            />
          </div>

          {/* Password Input */}
          <div className="mt-2 my-8 flex items-center justify-center">
            <label
              htmlFor="password"
              className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              className="w-full cursor-pointer text-md rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className=" flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Social Login */}
        <button
          className="w-full flex items-center h-8 cursor-pointer justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          onClick={handleGoogleSignIn}
        >
          {googleLoading ? (
            <Loader />
          ) : (
            <div className="flex items-center justify-center">
              <img src={google} alt="Google" className="w-5 h-5" />
              "continue with google"
            </div>
          )}
        </button>

        <p className="text-sm text-center mt-5">
          new to AlgoSprint ?
          <NavLink to={"/auth/signup"} className="text-indigo-500 pl-2">
            sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
