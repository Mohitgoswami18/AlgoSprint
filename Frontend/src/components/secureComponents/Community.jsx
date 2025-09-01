import { RiUserCommunityFill } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
const CommunityRooms = () => {
  const [discussionsList, setDiscussionList] = useState([]);

  useEffect(()=>{
    const handleDataFetching = async () => {
      await axios
        .get("https://algosprint-vxi4.onrender.com/api/v1/user/discussion")
        .then((res) => {
          setDiscussionList(res.data);
        })
        .catch((err) => {
          console.log("There was an error while fetching the content", err);
        });
    }

    handleDataFetching();
    
  }, [])

  return (
    <div className="bg-slate-50 transition-all duration-500 text-black dark:text-white dark:bg-black/80 shadow-md font-[Inter] p-5">
      <div className=" backdrop-blur-2xl bg-white/60 transition-all duration-500 dark:bg-[#111] p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-white/10 dark:bg-[#222] transition-all duration-500 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            <RiUserCommunityFill />
          </div>
          <div className="">
            <h1 className="text-xl text-black dark:text-white font-bold">
              Community space
            </h1>
            <p className=" text-[12px] tracking-tight">
              connect with more programmers out there and post whats on your
              mind
            </p>
          </div>
        </div>
      </div>
      <div className=" backdrop-blur-2xl my-8 transition-all duration-500 bg-slate-50 dark:bg-[#111] p-5 rounded-md shadow-xl ">
        <div className="font-semibold">Recent Discussions</div>

        <div className=" p-4 backdrop:2xl transition-all duration-500 rounded-md m-2 ">
          {discussionsList.map((elem, idx) => (
            <div className="m-4 bg-slate-100 transition-all duration-500 dark:bg-[#222] shadow-md rounded-md p-4">
              <h1 className="text-lg font-semibold ">{elem.title}</h1>
              <div className="flex gap-4 text-[12px] tracking-tight">
                <p>by {elem.user?.username}</p>
                <p>💬 {elem.reply?.length} replies</p>
                <p>{elem.createdAt}h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="backdrop-blur-2xl my-8 bg-white/10 p-5 rounded-md shadow-xl ">
        <div>Post what is in your mind</div>

        <Textarea></Textarea>
      </div>
    </div>
  );
};

export default CommunityRooms;
