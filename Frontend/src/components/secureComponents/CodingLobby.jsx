import Avatar from "react-avatar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { initialiseSocket } from "../../socket.io";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CodingLobby = () => {
  const [players, setPlayers] = useState([]);
  const socketRef = useRef();
  const location = useLocation();
  const param = useParams();
  const roomid = param.roomid;
  const username = location.state?.username;
  const navigate = useNavigate();

  useEffect(() => {
    const ConnectSocket = async () => {
      socketRef.current = await initialiseSocket();

      socketRef.current.emit("userJoin", { roomid, username });

      socketRef.current.on(
        "userJoined",
        ({ connectedPlayers, user, socketId }) => {
          if (user !== username) {
            toast.success(`${user} joined the room`);
          } else {
            toast.success(`You joined the room`);
          }

          console.log("connected Players", connectedPlayers);

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
        console.log(username)
        setPlayers((prev) =>
          prev.map((player) =>
            player.name === username ? { ...player, ready: !player.ready } : player
          )
        );
      });
    };

    ConnectSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomid, username]);

  console.log(players);

  const handleReadyLogic = (username) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.name === username ? { ...player, ready: !player.ready } : player
      )
    );
    console.log(roomid)
    socketRef.current.emit("ready", ({ roomid, username }));
  };

  useEffect(()=>{
    players.forEach((playerReady) => {
      if(playerReady.ready === false) return;
    })

    navigate(`/codingroom/${roomid}/arena`)
  },[players])

  return (
    <div className="h-screen bg-cyan-900 p-10 animate-fadeIn text-white ">
      <h1 className="text-center text-4xl font-bold p-4 text-white">
        Waiting Lobby
      </h1>
      <p className="text-center text-slate-xinc-600 dark:text-zinc-600">
        Welcome to the waiting lobby! The room is being prepared for the coding
        challenge. Get ready for the intense battle!
      </p>

      <div className="flex border-4 h-[60%] overflow-y-auto max-w-[600px] mx-auto flex-wrap border-zinc-500 items-center justify-center p-10 m-10 rounded-md">
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

      <div className="flex items-center justify-center">
        <Button
          className="mx-auto border-3 shadow-md"
          variant="outline"
          size="lg"
          onClick={() => handleReadyLogic(username)}
        >
          {players.find((player) => player.name === username)?.ready
            ? "Cancel"
            : "Ready"
            
          }

        </Button>
      </div>
    </div>
  );
};

export default CodingLobby;
