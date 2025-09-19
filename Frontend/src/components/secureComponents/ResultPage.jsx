import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uuid as v4 } from "uuid";

import CountdownTimer from "../Stopwatch";
const ResultPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const roomid = params.roomid;
  const style = location.style;
  const totalParticipants = location.totalParticipants;
  const problemFinished = location.problemFinished;
  const startTime = location.startTime;
  const username = location.state?.username || "bot";
  const timeTaken = location.state?.timeTaken || 120;
  const questionSolved = location.state?.questionSolved || 0;
  const [userFinished, setUserFinished] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [participants, setParticipants] = useState([]);
  let dataForBackendRequestBody = {};
  const timeLeft = Date.now() - startTime;
  const resultOfTheCurrentUser =
    Math.floor(10 / 100) * totalParticipants <= 10 ? "WIN" : "LOSE";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://algosprint-vxi4.onrender.com/api/v1/${username}/dashboard`
        );
        setUserProfile("user profile", res.data);
        console.log(userProfile.data.data);
      } catch (err) {
        console.log("An error occurred", err);
      }
    };

    fetchUserProfile();

    const connectToSockets = async () => {
      console.log("Connecting to the sockets");
      socketRef.current = await initialiseSocket();
      console.log("Connected to the sockets", socketRef.current);

      socketRef.current.emit("userJoin", { roomid, username });

      socketRef.current.on("userJoined", ({ connectedPlayers }) => {
        setUserFinished(
          connectedPlayers.map((elem) => ({
            username: elem.username,
            timeTaken,
            questionSolved,
            level: userProfile.level,
            title: userProfile.title,
            profilePicture: userProfile.profilePicture,
            rank: userProfile.rank,
            matchIdentifier: uuid(),
          }))
        );

        setParticipants(
          connectedPlayers.map((elem) => ({
            username: elem.username,
            score: questionSolved* 10,
            outcome: resultOfTheCurrentUser,
          }))
        );
      });

      socketRef.current.on("connect_error", (err) => {
        console.log("socket error", err);
      });
      socketRef.current.on("connect_failed", (err) => {
        console.log("socket failed", err);
      });
    };

    connectToSockets();
    console.log(userFinished);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const HandleResultUpdation = async () => {
    if (userProfile) {
      dataForBackendRequestBody = {
        style: style,
        username: userProfile.username,
        position: problemFinished,
        result: resultOfTheCurrentUser,
        participants: participants,
      };
    }

    await axios.post("http://localhost:8000/api/v1/user/updateRatings")
    .then((res) => {
      console.log("successfully updated the user data");
      console.log(res);
    })
    .catch((err) => {
      console.log("An error occured", err);
    });
  };

  console.log(userFinished);
  console.log(
    "data Sending to the backend for this current user",
    dataForBodyRequest
  );

  return (
    <div className="font-[Inter] py-6">
      <h1 className="text-3xl font-bold text-center p4">Result</h1>
      <p className="text-lg p-4 text-gray-600 text-center dark:text-white/10">
        The rankings will take upto 3 working days to reflect into your profile
      </p>
      <div className="mx-auto">
        <CountdownTimer
          initialSeconds={timeLeft}
          onComplete={HandleResultUpdation}
        />
      </div>

      <div className="max-w-[600px] mx-auto rounded-md p-2 m-12">
        <Table>
          <TableCaption>User Finished</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Rank</TableHead>
              <TableHead className="w-20%]">User</TableHead>
              <TableHead>Questions Solved</TableHead>
              <TableHead className="">Time Taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userFinished.map((elem, idx) => (
              <TableRow key={idx} className="text-start">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{elem.username}</TableCell>
                <TableCell>{elem.problemFinished}</TableCell>
                <TableCell>{elem.timeTaken}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultPage;
