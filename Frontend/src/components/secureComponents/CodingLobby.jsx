import Avatar from "react-avatar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Button } from "@/components/ui/button";

const CodingLobby = () => {
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState([]);
  const socketRef = useRef();
  const location = useLocation();
  const param = useParams();
  const roomid = param.roomid;
  const username = location.state?.username;
  const realUsername = location.state?.realUsername;
  const navigate = useNavigate();
  const topic = location.state?.topic || " ";
  const settings = location.state?.settings || " ";
  const time = settings.time || " ";

  console.log(settings)

  useEffect(() => {
    const ConnectSocket = async () => {
      socketRef.current = await initialiseSocket();

      socketRef.current.emit("userJoin", { roomid, username });

      const handleError = (err) => {
        console.log("socket error", err);
        toast.error("Socket connection failed, try again later");
        navigate(`/${realUsername }/codingrooms`, { replace: true });
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      socketRef.current.on(
        "userJoined",
        ({ connectedPlayers, user, socketId }) => {
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
        }
      );

      socketRef.current.on("ready", ({ username }) => {
        setPlayers((prev) =>
          prev.map((player) =>
            player.name === username
              ? { ...player, ready: !player.ready }
              : player
          )
        );
      });
    };

    socketRef.current?.on("user-disconnected", ({ username, socketId }) => {
      setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
      toast.success(`${username} left the room`);
    });
    ConnectSocket();

    return () => {
      socketRef.current.emit("leave", { username, roomid });
      socketRef.current?.disconnect();
    };
  }, [roomid, username]);


  const handleReadyLogic = (username) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.name === username ? { ...player, ready: !player.ready } : player
      )
    );
    socketRef.current.emit("ready", { roomid, username });
  };

  useEffect(() => {
    if (players.length < 2) return;

    for (let i = 0; i < players.length; i++) {
      if (!players[i].ready) return;
    }

    let codingQuestions = [];
    const FetchQuestionsFromTheBackend = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/codingrooms/arena/problems",
          {
            params: {
              questions: settings?.numberOfProblems,
            },
          }
        );

        const codingQuestions = res.data.data.questions;
        setData(true);

        await updateCurrentRoomSettings(codingQuestions);
      } catch (err) {
        console.log("some error occurred", err);
        setData(false);
      }
    };

    FetchQuestionsFromTheBackend();

    const updateCurrentRoomSettings = async (codingQuestions) => {
      console.log("Final data going to backend:", codingQuestions);
      await axios.post(
        "http://localhost:8000/api/v1/user/codingrooms/updateRoomDetails",
        {
          roomCode: roomid,
          questions: codingQuestions,
          time: time,
        }
      );
    };

    if(data) {
      updateCurrentRoomSettings();
    }

    if(data) {
      navigate(`/codingroom/${roomid}/arena`, {
        state: {
          setting: settings,
          username: username,
          time: time,
          topic: topic,
          roomid,
          startTime: Date.now()
        },
      });
    } else {
      return;
    }
    
  }, [players]);

  return (
    <div className="h-screen font-[Inter] bg-zinc-800 p-10 pt-5 animate-fadeIn text-white ">
      <h1 className="text-center text-4xl font-bold p-4 text-white">
        Waiting Lobby
      </h1>
      <p className="text-center text-slate-xinc-600">
        Welcome to the waiting lobby! The room is being prepared for the coding
        challenge. Get ready for the intense battle!
      </p>
      <p className="text-center">
        <mark className="bg-cyan-500 px-2">
          atleast 2 coders are needed to begin the battle
        </mark>
      </p>

      <div>
        <div className="text-center flex items-center gap-4 font-bold justify-center mt-4 text-slate-xinc-600">
          <p>PlayStyle: {settings.playStyle}</p>
          <p>Number of Problems: {settings.numberOfProblems}</p>
        </div>
      </div>

      <div className="flex border-4 h-[50%] overflow-y-auto max-w-[600px] mx-auto flex-wrap border-zinc-500 items-center justify-center p-10 m-10 mb-4 rounded-md">
        {players.map((elem, idx) => (
          <div key={idx} className="basis-[24%] text-center">
            {elem.avatar}
            <p
              className={`${
                elem.ready ? "text-green-500" : "text-red-500"
              } text-sm font-bold`}
            >
              {elem.name}
            </p>
          </div>
        ))}
      </div>

      <div className="font-bold test-sm pb-4 text-center">
        coders Joined : <span>{players.length}</span>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <Button
          className="border-3 shadow-md"
          variant="outline"
          size="sm"
          onClick={() => handleReadyLogic(username)}
        >
          {players.find((player) => player.name === username)?.ready
            ? "Cancel"
            : "Ready"}
        </Button>
        <Button
          className="border-3 shadow-md"
          variant="destructive"
          size="sm"
          onClick={() => {
            toast.success("Leaved the room successfully!");
            navigate(`/${realUsername}/codingroom`, { replace: true });
          }}
        >
          leave
        </Button>
      </div>
    </div>
  );
};

export default CodingLobby;
