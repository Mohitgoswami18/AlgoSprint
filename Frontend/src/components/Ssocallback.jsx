import { useEffect, useState } from "react";
import { useUser, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SsoCallback = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showMissingFields, setShowMissingFields] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isLoaded) return;

    try {
      if (isSignedIn && user) {
        const userUsername =
          user.username ||
          user.firstName?.toLowerCase() ||
          user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
          user.id;

        console.log(
          "User signed in, redirecting to:",
          `/${userUsername}/dashboard`
        );
        navigate(`/${userUsername}/dashboard`);
        return;
      }

      if (signUp && signUp.status === "missing_requirements") {
        console.log("Signup missing requirements, showing missing fields form");
        setShowMissingFields(true);
        return;
      }

      if (!isSignedIn && !signUp) {
        console.log("No user or signup found, redirecting to sign-in");
        setError("Authentication failed");
        setTimeout(() => navigate("/auth/signin"), 2000);
      }
    } catch (err) {
      console.error("Error during SSO callback:", err);
      setError(`Authentication error: ${err.message}`);
      setTimeout(() => navigate("/auth/signin"), 3000);
    }
  }, [isLoaded, isSignedIn, user, signUp, navigate]);

  const handleMissingFields = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!signUp) {
        throw new Error("No signup session found");
      }

      // Complete the signup with missing fields
      const result = await signUp.update({
        username: username,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("Signup completed, redirecting to dashboard");
        navigate(`/${username}/dashboard`);
      } else {
        console.log("Signup still incomplete:", result.status);
        setError("Failed to complete signup. Please try again.");
      }
    } catch (error) {
      console.error("Missing fields error:", error); 
        setError("Failed to complete signup. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  // Show missing fields form
  if (showMissingFields) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black">
        <div className="w-full max-w-sm bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Please choose a username to finish setting up your account
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleMissingFields}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white dark:bg-zinc-800 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a username"
                minLength={3}
                maxLength={20}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Completing..." : "Complete Signup"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black">
        <div className="text-center bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading authentication...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black">
        <div className="text-center bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Authentication Issue
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Redirecting to sign-in page...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          Processing authentication...
        </p>
      </div>
    </div>
  );
};

export default SsoCallback;