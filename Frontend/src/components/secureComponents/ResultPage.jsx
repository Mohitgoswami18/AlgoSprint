import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { v4 as uuid } from "uuid";
import CountdownTimer from "../Stopwatch";

const ResultPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const roomid = params.roomid;
  const style = location.state.style;
  const timeTake = location.state.timeTake
  const totalParticipants = location.state.totalParticipants;
  const problemFinished = location.state.problemFinished;
  const startTime = location.state.startTime;
  const realUsername = location.state?.realUsername;
  const username = location.state?.username || "bot";
  const totalTime = location.state?.time || 120; // total match time

  const [userProfile, setUserProfile] = useState({});
  const [userFinished, setUserFinished] = useState([]);
  console.log(realUsername)

  const timeLeft = startTime + totalTime - Math.floor(Date.now() / 1000); 

  // Fetch user profile
  useEffect(() => {
    console.log("We are fetching the user dashboard")
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/user/dashboard`,
          {
            params: {
              username: realUsername,
            },
          }
        );

        console.log(res)
        setUserProfile(res.data.data);
      } catch (err) {
        console.log("An error occurred fetching user profile", err);
      }
    };
    fetchUserProfile();
  }, [realUsername]);

  // Initialize sockets after userProfile is loaded
  useEffect(() => {
    if (!userProfile.username) return;

    const connectToSockets = async () => {
      socketRef.current = await initialiseSocket();
      socketRef.current.emit("userJoin", { roomid, username });

      socketRef.current.on("userJoined", ({ connectedPlayers }) => {
        setUserFinished((prev) => {
          const newUsers = connectedPlayers
            .filter((elem) => !prev.some((p) => p.user === elem._id))
            .map((elem, idx) => {
              const score = (elem.questionSolved || 0) * 10;
              const position = prev.length + idx + 1;
              const outcome =
                position <= Math.ceil(totalParticipants * 0.1) ? "WIN" : "LOSE";
              const ratingChange =
                outcome === "WIN" ? 100 / position : -100 * position;

              return {
                user: elem._id,
                username: realUsername,
                timeTaken: timeTake,
                position,
                score,
                outcome,
                questionSolved: problemFinished,
                ratingChange,
              };
            });

          const updatedUsers = [...prev, ...newUsers];

          const currentUserResult = updatedUsers.find(
            (p) => p.username === realUsername
          )?.outcome;

          if (newUsers.some((p) => p.username === realUsername)) {
            sendResultsToBackend(updatedUsers, currentUserResult);
          }

          return updatedUsers;
        });
      });

      socketRef.current.on("connect_error", (err) =>
        console.log("Socket error:", err)
      );
      socketRef.current.on("connect_failed", (err) =>
        console.log("Socket failed:", err)
      );
    };

    connectToSockets();

    return () => socketRef.current?.disconnect();
  }, [userProfile, roomid, totalParticipants]);

  // Send results to backend
  const sendResultsToBackend = async (participants, resultOfTheCurrentUser) => {
    const dataForBackendRequestBody = {
      style,
      username: realUsername,
      position: problemFinished,
      result: resultOfTheCurrentUser,
      participants, 
      matchIdentifier: uuid(),
      startTime,
      duration: totalTime,
    };


    console.log(
      "SEnding this data into the backend \n\n\n\n\n\n",
      dataForBackendRequestBody,
      "\n\n\n\n\n\n\n"
    );

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/updateRatings",
        dataForBackendRequestBody
      );
      console.log("Successfully updated user data:", res.data);
    } catch (err) {
      console.log("Error updating result:", err);
    }
  };


  return (
    <div className="font-[Inter] py-6">
      <h1 className="text-3xl font-bold text-center p-4">Result</h1>
      <p className="text-lg p-4 text-gray-600 text-center dark:text-white/10">
        The rankings will take up to 3 working days to reflect in your profile
      </p>

      <div className="mx-auto">
        <CountdownTimer initialSeconds={timeLeft > 0 ? timeLeft : 0} />
      </div>

      <div className="max-w-[600px] mx-auto rounded-md p-2 m-12">
        <Table>
          <TableCaption>User Finished</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Rank</TableHead>
              <TableHead className="w-[20%]">User</TableHead>
              <TableHead>Questions Solved</TableHead>
              <TableHead>Time Taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userFinished.map((elem, idx) => (
              <TableRow key={idx} className="text-start">
                <TableCell>{elem.position}</TableCell>
                <TableCell>{elem.username}</TableCell>
                <TableCell>{elem.questionSolved}</TableCell>
                <TableCell>{elem.timeTaken}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-fit mx-auto my-4">
          <Button
            variant="personal"
            size="sm"
            onClick={() => navigate(`/${realUsername}/dashboard`)}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
