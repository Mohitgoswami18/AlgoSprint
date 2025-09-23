import { useEffect, useRef, useState } from "react";
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
import CountdownTimer from "../Stopwatch";

const ResultPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const roomid = params.roomid;
  const score = location.state.score;
  const timeTake = location.state.timeTaken;
  console.log(timeTake, score);
  const totalParticipants = location.state.totalParticipants;
  const startTime = location.state.startTime;
  console.log("FERGFRG", startTime);
  const realUsername = location.state?.realUsername;
  console.log(realUsername);
  const username = location.state?.username || "bot";
  const totalTime = location.state?.time || 120;

  const [userProfile, setUserProfile] = useState({});
  const [userFinished, setUserFinished] = useState([]);
  const [backendCallMade, setBackendCallMade] = useState(false);

  const timeLeft = startTime + totalTime - Math.floor(Date.now() / 1000);

  const determineOutcome = (position, totalParticipants) => {
    const winnerThreshold = Math.max(1, Math.ceil(totalParticipants / 2));
    return position <= winnerThreshold ? "WIN" : "LOSE";
  };

  const calculateRatingChange = (outcome, position, totalParticipants) => {
    if (outcome === "WIN") {
      return Math.max(10, 100 - (position - 1) * 10);
    } else {
      const lossMultiplier = Math.min(
        10,
        position - Math.ceil(totalParticipants / 2)
      );
      return -Math.max(10, 20 * lossMultiplier);
    }
  };
  
  useEffect(() => {
    console.log("We are fetching the user dashboard", realUsername);
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

        console.log(res);
        setUserProfile(res.data.data);
      } catch (err) {
        console.log("An error occurred fetching user profile", err);
      }
    };
    fetchUserProfile();
  }, [realUsername]);
  useEffect(() => {
    if (!userProfile.username) return;

    const connectToSockets = async () => {
      socketRef.current = await initialiseSocket();

      socketRef.current.emit("userFinished", {
        roomid,
        username: realUsername,
        score,
        timeTaken: timeTake,
      });

      socketRef.current.on(
        "playerConnectedToTheWaitingArea",
        async ({ newPlayerData, allWaitingPlayers }) => {
          try {
            console.log(typeof userProfile.userid, "fiudshguhodhs");
            await axios.post(
              `http://localhost:8000/api/v1/user/codingrooms/updateparticipantsdetails`,
              {
                roomCode: String(roomid),
                participantTimeTaken: String(newPlayerData.timeTaken),
                participantUsername: newPlayerData.username,
                participantScore: newPlayerData.score,
              }
            )
          } catch (error) {
            console.error("Error managing room:", error);
          }


          setUserFinished((prev) => {
            // Check if participant already exists
            const exists = prev.find(
              (p) => p.username === newPlayerData.username
            );
            if (exists) return prev; // skip adding again

            const updatedList = [...prev, { ...newPlayerData, finished: true }];

            // Sort by score/time
            updatedList.sort(
              (a, b) => b.score - a.score || a.timeTaken - b.timeTaken
            );

            // Assign positions
            return updatedList.map((p, index) => ({
              ...p,
              position: index + 1,
            }));
          });
        }
      );

      socketRef.current.on("connect_error", (err) =>
        console.log("Socket error:", err)
      );
      socketRef.current.on("connect_failed", (err) =>
        console.log("Socket failed:", err)
      );
    };

    connectToSockets();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveTheWaitingArea", {
          username: realUsername,
          roomid,
        });
        socketRef.current.disconnect();
      }
    };
  }, [userProfile, roomid, realUsername, score, timeTake]);

  useEffect(() => {
    // Fetch the current room participants
    console.log("FEtCHING ksjdhfvliduhvuhzvjnzuvhlzdvn;uvh")
    const fetchRoomParticipants = async () => {
      console.log("INSIDE THE FECTHIN USER PARTICIPANT API CALL FUNCTION")
      try {
        console.log("fetching paetucipants")
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/rooms/participants`,
          {
            params: { roomid },
          }
        );

        console.log(response);
        const participants = response.data.data.participants
          .filter((participant) => participant.finished === true)
          .map((participant, index) => ({
            ...participant,
            position: index + 1,
          }));


        setUserFinished(participants);
      } catch (error) {
        console.error("Error fetching room participants:", error);
      }
    };

    fetchRoomParticipants();
  }, [roomid]);

  console.log(userFinished)


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
              <TableHead>Qscore</TableHead>
              <TableHead>Time Taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userFinished.map((elem, idx) => (
              <TableRow key={idx} className="text-start">
                <TableCell>{elem.position}</TableCell>
                <TableCell
                  className={elem.username === realUsername ? "font-bold" : ""}
                >
                  {elem.username}
                </TableCell>
                <TableCell>{elem.score}</TableCell>
                <TableCell>{elem.timeTaken}s</TableCell>
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
