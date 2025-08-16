import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "sonner";


export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      setError("Failed to sign up. Please try again.");
      console.log(error);
    }
    setLoading(false);

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast.success(
        "Sign up successful! Please check your email for verification code."
      );
      setLoading(false);
      setPendingVerification(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to verify email. Please try again.");
      setError("Failed to verify email. Please try again.");
    }
  };

   const handleEmailVerification = async (e) => {
      e.preventDefault();
      setLoading(true);
      if(!isLoaded) {
        return;
      }
      try {
        const signupCompleted = await signUp.attemptEmailAddressVerification({
          code,
        });

        if(signupCompleted.status === "complete") {
          await setActive({session: signupCompleted.createdSessionId});
          setLoading(false);
          navigate("/user/dashboard");
        } else {
          toast.error("Verification failed. Please try again.");
          setLoading(false);
          setError("Invalid code. Please try again.");
          console.log("Verification failed:", signupCompleted);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to verify email. Please try again.");
        setError("Failed to verify email. Please try again.");
        console.log(error);
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

        {!pendingVerification ? (
          <form onSubmit={handleSignUp}>
            <div className="mt-2 my-4 flex items-center justify-center">
              <label
                htmlFor="username"
                className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
              >
                username
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
              />
            </div>
            <div className="flex items-center my-4 justify-center">
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email"
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                className="w-full h-8 flex items-center justify-center cursor-pointer text-md rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                type="submit"
              >
                {!loading ? "Sign Up" : <Loader />}
              </button>
            </div>
          </form>
        ) : (
          <div onSubmit={handleEmailVerification}>
            <div className="mt-2 my-8 flex items-center justify-center">
              <label
                htmlFor="code"
                className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
              >
                code
              </label>
              <input
                type="text"
                id="code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="w-full h-8 flex items-center justify-center cursor-pointer text-md rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                onClick={handleEmailVerification}
              >
                {!loading ? "verify" : <Loader />}
              </button>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="w-full h-8 cursor-pointer flex items-center justify-center text-md rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                onClick={() => setPendingVerification(false)}
              >
                try Again
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className=" flex items-center my-4">
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

        <p className="text-sm text-center mt-5">
          Already have an account ?
          <NavLink to={"/auth/signin"} className="text-indigo-500 pl-2">
            sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
