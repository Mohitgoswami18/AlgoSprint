import Avatar from "react-avatar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import lobbybackground from "../../assets/images/lobbyBackground.png";

const CodingLobby = () => {
  const [players, setPlayers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState("");
  const [questionsFetched, setQuestionsFetched] = useState(false);

  const socketRef = useRef();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const roomid = params.roomid;
  const username = location.state?.username;
  const realUsername = location.state?.realUsername;
  const time = location.state?.time || " ";


  useEffect(() => {
    const findRoomTopic = async () => {
      try {
        const res = await axios.get(
          "https://algosprint-vxi4.onrender.com/api/v1/user/mcqRoomTopics",
          { params: { roomid } }
        );
        setTopic(res.data.data.topic); 
      } catch (err) {
        console.log("Error fetching topic", err);
      }
    };
    findRoomTopic();
  }, [roomid]);


  useEffect(() => {
    const connectSocket = async () => {
      socketRef.current = await initialiseSocket();

      socketRef.current.emit("userJoin", { roomid, username });

      const handleError = (err) => {
        console.error("Socket error:", err);
        toast.error("Socket connection failed, try again later");
        navigate(`/${username}/mcqrooms`, { replace: true });
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      socketRef.current.on("userJoined", ({ connectedPlayers, user }) => {
        if (user !== username) {
          toast.success(`${user} joined the room`);
        } else {
          toast.success(`You joined the room`);
        }

        setPlayers(
          connectedPlayers.map((elem) => ({
            socketId: elem.socketId,
            name: elem.username,
            ready: false,
            avatar: <Avatar name={elem.username} size="50" round={true} />,
          }))
        );
      });

      socketRef.current.on("ready", ({ username }) => {
        setPlayers((prev) =>
          prev.map((player) =>
            player.name === username
              ? { ...player, ready: !player.ready }
              : player
          )
        );
      });

      socketRef.current.on("user-disconnected", ({ username, socketId }) => {
        setPlayers((prev) => prev.filter((user) => user.socketId !== socketId));
        toast.success(`${username} left the room`);
      });
    };

    connectSocket();

    return () => {
      socketRef.current.emit("leave", { username, roomid });
      socketRef.current?.disconnect();
    };
  }, [roomid, username, navigate]);

  const handleReadyLogic = () => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.name === username ? { ...player, ready: !player.ready } : player
      )
    );
    socketRef.current.emit("ready", { roomid, username });
  };

  useEffect(() => {
    if (players.length < 2) return;

    const allReady = players.every((p) => p.ready);
    if (!allReady || questionsFetched) return;

    const fetchQuestionsAndStart = async () => {
      try {
        const res = await axios.get(
          `https://algosprint-vxi4.onrender.com/api/v1/user/mcqroom/arena/topic/problems`,
          { params: { topic } }
        );

        const mcqQuestions = res.data.data.Questions;
        await axios.post(
          "https://algosprint-vxi4.onrender.com/api/v1/user/mcqrooms/updateroomdetails",
          { roomCode: roomid, questions: mcqQuestions }
        );

        setQuestionsFetched(true);

        navigate(`/mcqrooms/${roomid}/arena`, {
          state: {
            username,
            startTime: Math.floor(Date.now() / 1000),
            topic,
            roomid,
            totalParticipants: players.length,
            realUsername,
          },
        });
      } catch (err) {
        console.log("Error fetching questions", err);
        toast.error("Failed to fetch questions");
      }
    };

    fetchQuestionsAndStart();
  }, [
    players,
    topic,
    roomid,
    navigate,
    username,
    realUsername,
    questionsFetched,
  ]);

  const handleCopyRoomId = async () => {
    await navigator.clipboard.writeText(roomid);
    setCopied(true);
    toast.success("Room ID copied!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="h-screen font-[Inter] text-white"
      style={{
        backgroundImage: `url(${lobbybackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-center text-4xl font-bold p-4">Waiting Lobby</h1>
      <p className="text-center font-bold text-sm underline px-2">
        At least 2 coders are needed to begin the battle
      </p>

      <div className="text-center mt-6 flex items-center gap-4 justify-center">
        <p>Topic: {topic}</p>
        <p>Time Limit: {time}</p>
      </div>

      <div className="flex border-2 h-[40vh] backdrop-blur-sm overflow-y-auto max-w-[600px] mx-auto flex-wrap border-red-300 items-center justify-center p-10 m-10 rounded-md">
        {players.map((elem, idx) => (
          <div key={idx} className="basis-[24%] text-center">
            {elem.avatar}
            <p
              className={
                elem.ready
                  ? "text-green-500 font-bold text-sm"
                  : "text-red-500 font-bold text-sm"
              }
            >
              {elem.name}
            </p>
          </div>
        ))}
      </div>

      <div className="font-bold text-sm pb-4 text-center">
        Coders Joined : <span>{players.length}</span>
      </div>

      <div className="flex items-center gap-4 justify-center">
        <Button variant="outline" size="sm" onClick={handleReadyLogic}>
          {players.find((p) => p.name === username)?.ready ? "Cancel" : "Ready"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            toast.success("Left the room successfully!");
            navigate(`/${username}/mcqrooms`, { replace: true });
          }}
        >
          Leave
        </Button>
        <Button onClick={handleCopyRoomId}>
          {copied ? "Copied!" : "Copy Id"}
        </Button>
      </div>
    </div>
  );
};

export default CodingLobby;
