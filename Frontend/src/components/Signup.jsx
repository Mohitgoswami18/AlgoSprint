import { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import google from "../assets/images/google.png"
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const { user } = useUser(); 

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await signUp.authenticateWithRedirect(
      {
        strategy:"oauth_google",
        redirectUrl:"/sso-callback",
        redirectUrlComplete:"/sso-callback"
      }
    )
    setGoogleLoading(false);
    toast.success("Login Successfully !")
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success(
        "Sign up successful! Please check your email for verification code."
      );
      setPendingVerification(true);
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      setError("Failed to sign up. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      const signupCompleted = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signupCompleted.status === "complete") {
        await setActive({ session: signupCompleted.createdSessionId });
        const username = user?.username || user?.id;
        navigate(`/${ username }/dashboard`);
      } else {
        toast.error("Verification failed. Please try again.");
        setError("Invalid code. Please try again.");
        console.log("Verification failed:", signupCompleted);
      }
    } catch (error) {
      toast.error("Failed to verify email. Please try again.");
      setError("Failed to verify email. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-[Inter] items-center justify-center bg-slate-50 dark:bg-black px-1">
      <div className="w-full max-w-sm ring-[0.5px] dark:ring-zinc-600 rounded-md bg-white dark:bg-zinc-900 backdrop-blur-2xl px-8 pt-2 shadow-lg pb-2">
        <h1 className="text-center font-[Inter] mt-2 text-3xl font-bold text-gray-900 dark:text-[#F7FAFC]">
          Welcome to AlgoSprint
        </h1>
        <p className="text-md text-center text-gray-500 dark:text-gray-400">
          Sign in or create an account to continue
        </p>

        {!pendingVerification ? (
          <form onSubmit={handleSignUp}>
            {/* Username */}
            <div className="mt-2 my-4 flex items-center justify-center">
              <label
                htmlFor="username"
                className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
              >
                Username
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Submit */}
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
          <form onSubmit={handleEmailVerification}>
            {/* Verification Code */}
            <div className="mt-2 my-8 flex items-center justify-center">
              <label
                htmlFor="code"
                className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
              >
                Code
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
                type="submit"
              >
                {!loading ? "Verify" : <Loader />}
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="w-full h-8 cursor-pointer flex items-center justify-center text-md rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 transition"
                onClick={() => setPendingVerification(false)}
              >
                Try Again
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <button
          className="w-full flex items-center h-8 cursor-pointer justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          onClick={handleGoogleSignUp}
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
          Already have an account?
          <NavLink to={"/auth/signin"} className="text-indigo-500 pl-1">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
