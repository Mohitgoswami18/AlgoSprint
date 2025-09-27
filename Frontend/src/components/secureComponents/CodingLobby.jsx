import Avatar from "react-avatar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Button } from "@/components/ui/button";
import lobbybackground from "../../assets/images/lobbyBackground.png"

const CodingLobby = () => {
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false)
  const socketRef = useRef();
  const location = useLocation();
  const param = useParams();
  const roomid = param.roomid;
  const username = location.state?.username;
  const realUsername = location.state?.realUsername;
  const navigate = useNavigate();
  const topic = location.state?.topic || " ";
  const [roomSettingData, setRoomSettingData] = useState([]);
  const settings = location.state?.settings
  const time = settings?.time || " ";

  console.log(settings)
  console.log(
    'hbkgyugiuyguyg',realUsername)

    const handleCopyTask = async () => {
      if(!copied) {
        await navigator.clipboard.writeText(roomid)
      }
      toast.success("Copied room id")
      setCopied(true);

      setInterval(()=> setCopied(false), 2000);
    }

  useEffect(()=>{
   
    const findRoomSetting = async () => {
      const res = await axios.get(
        "https://algosprint-vxi4.onrender.com/api/v1/user/codingroomsettings",
        { params: { roomid } }
      );
      console.log(res.data.data);
      setRoomSettingData([res.data.data.numberofQuestions, res.data.data.style]);
    }

    findRoomSetting();
  }, [])

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

    const startLobbyGameFlow = async () => {
      const updateCurrentRoomTimings = async () => {
        await axios
          .post(
            "https://algosprint-vxi4.onrender.com/api/v1/user/codingrooms/updateRoomDetails",
            {
              roomCode: roomid,
              time: time,
            }
          )
          .then((res) => {
            console.log("Updated the timings of the room successfully");
          })
          .catch((err) => {
            console.log("an error occur", err);
          });
      };
      updateCurrentRoomTimings();

      const FetchQuestionsFromTheBackend = async () => {
        try {
          const res = await axios.get(
            "https://algosprint-vxi4.onrender.com/api/v1/user/codingrooms/arena/problems",
            {
              params: {
                questions: Number(settings?.numberOfProblems),
              },
            }
          );

          console.log(res)
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
          "https://algosprint-vxi4.onrender.com/api/v1/user/codingrooms/updateRoomDetails",
          {
            roomCode: roomid,
            questions: codingQuestions,
            
          }
        );
      };
    }

    startLobbyGameFlow();

    console.log("The startTime is", Math.floor(Date.now() / 1000));

    if(data) {
      navigate(`/codingroom/${roomid}/arena`, {
        state: {
          setting: settings,
          username: username,
          time: time,
          topic: topic,
          roomid,
          realUsername,
          totalQuestions: roomSettingData[0],
          startTime: Math.floor(Date.now()/1000),
          totalParticipants: players.length
        },
      });
    } else {
      return;
    }
    
  }, [players]);

  return (
    <div
      className="min-h-screen relative font-[Inter] text-white"
      style={{
        backgroundImage: `url(${lobbybackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/2" />

      <div className="relative z-10 p-10 pt-5 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-4xl font-extrabold p-4">
            Waiting Lobby
          </h1>

          <p className="text-center mt-4 text-sm font-bold underline">
            atleast 2 coders are needed to begin the battle
          </p>

          <div className="mt-16 mb-2">
            <div className="text-center flex items-center gap-4 font-bold justify-center text-white">
              <p>PlayStyle: {roomSettingData[1]}</p>
              <p>Problems: {roomSettingData[0]}</p>
            </div>
          </div>

          <div
            className="flex border-2 h-[40vh] overflow-y-auto max-w-[600px] mx-auto flex-wrap 
               border-red-300 items-center justify-center p-10 m-10 mt-4 mb-4 rounded-md
               bg-black/30 backdrop-blur-sm"
          >
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
              className="border-3 shadow-md hover:bg-white/20 cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => handleReadyLogic(username)}
            >
              {players.find((player) => player.name === username)?.ready
                ? "Cancel"
                : "Ready"}
            </Button>
            <Button
              className="border-3 shadow-md cursor-pointer"
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.success("Leaved the room successfully!");
                navigate(`/${realUsername}/codingroom`, { replace: true });
              }}
            >
              leave
            </Button>
            <Button
              className="border-3 shadow-md cursor-pointer hover:bg-white/20"
              size="sm"
              onClick={() => handleCopyTask()}
            >
              Copy Id
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingLobby;

