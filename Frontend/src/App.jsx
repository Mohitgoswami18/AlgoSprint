import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/secureComponents/Dashboard";
import ProfileLayout from "./components/secureComponents/ProfileLayout";
import WebsiteLayout from "./components/WebsiteLayout";
import Leaderboard from "./components/secureComponents/Leaderboard";
import CodingRooms from "./components/secureComponents/CodingRooms";
import McqRooms from "./components/secureComponents/McqRooms";
import Community from "./components/secureComponents/Community";
import CollaborativeRooms from "./components/secureComponents/CollaborativeRooms";
import AuthenticationLayout from "./components/AuthenticationLayout";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { SignedIn,} from "@clerk/clerk-react";
import NotFound from "./components/NotFound";
import EditorLayout from "./components/EditorLayout"
import CodeEditor from "./components/EditorLayout";

const App = () => {
  const [clickEffects, setClickEffects] = useState([]);

  const handleClick = (e) => {
    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickEffects((prev) => [...prev, newEffect]);

    setTimeout(() => {
      setClickEffects((prev) =>
        prev.filter((effect) => effect.id !== newEffect.id)
      );
    }, 800);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="font-[Inter] bg-slate-50 dark:bg-black relative min-h-screen">
      {/* Cursor Click Animation */}
      {clickEffects.map((c) => (
        <span
          key={c.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: c.x - 8 + "px",
            top: c.y - 8 + "px",
          }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-green-400 bg-green-500/30 shadow-lg shadow-green-400 animate-ping"></div>
          <div className="w-4 h-4 rounded-full border border-green-300 absolute inset-0 animate-ping"></div>
        </span>
      ))}

      {/* Public Routes */}
      <Routes>
        <Route path="/code" element={<CodeEditor />}></Route>
        <Route path="/" element={<WebsiteLayout />} />
        <Route path="/auth/*" element={<AuthenticationLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>

      {/* Protected Routes */}
      <SignedIn>
        <Routes>
          <Route path="/user/*" element={<ProfileLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="codingrooms" element={<CodingRooms />} />
            <Route path="mcqrooms" element={<McqRooms />} />
            <Route path="community" element={<Community />} />
            <Route path="collaborativerooms" element={<CollaborativeRooms />} />
          </Route>
        </Routes>
      </SignedIn>

      <Routes>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
