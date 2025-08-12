import Dashboard from "./components/secureComponents/dashboard";
import { Routes, Route, Outlet } from "react-router-dom";
import ProfileLayout from "./components/secureComponents/ProfileLayout";
import WebsiteLayout from "./components/WebsiteLayout"
import Leaderboard from "./components/secureComponents/Leaderboard";
import CodingRooms from "./components/secureComponents/CodingRooms";
import McqRooms from "./components/secureComponents/McqRooms"
import Community from "./components/secureComponents/Community"
import CollaborativeRooms from "./components/secureComponents/CollaborativeRooms"
import Signin from "./components/Signin"
import Signup from "./components/Signup";

const App = () => {
  return (
    <div className="font-[Inter] bg-slate-50 dark:bg-black">
      <Routes>
        <Route path="/" element={<WebsiteLayout />} />
        <Route path="/login" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/user/*" element={<ProfileLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="leaderboard" element={<Leaderboard />}></Route>
          <Route path="codingrooms" element={<CodingRooms />}></Route>
          <Route path="mcqrooms" element={<McqRooms />}></Route>
          <Route path="codingrooms" element={<CodingRooms />}></Route>
          <Route path="community" element={<Community />}></Route>
          <Route
            path="collaborativerooms"
            element={<CollaborativeRooms />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
