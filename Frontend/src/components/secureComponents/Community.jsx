import { RiUserCommunityFill } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
const CommunityRooms = () => {
  const [discussionsList, setDiscussionList] = useState([]);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  let discussionData = [];
  if(discussionsList.length > 0 && data ) {
    discussionData = discussionsList;
    console.log(discussionData)
  }

  useEffect(()=>{
    const handleDataFetching = async () => {
      await axios
        .get("https://algosprint-vxi4.onrender.com/api/v1/user/discussion")
        .then((res) => {
          console.log("data fetched")
          console.log(res.data.data.discussionData)
          setData(true);
          setError(false);
          setDiscussionList(res.data.data.discussionData);
        })
        .catch((err) => {
          setError(true);
          setData(false);
          console.log("There was an error while fetching the content", err);
        });
    }

    handleDataFetching();
    
  }, [])

  return (
    <div>
      {error ? (
        <p>There was an error </p>
      ) : (
        <div className="bg-slate-50 transition-all duration-500 text-black dark:text-white dark:bg-black/80 shadow-md font-[Inter] p-5">
          <div className=" backdrop-blur-2xl bg-white/60 transition-all duration-500 dark:bg-[#111] p-5 rounded-md shadow-xl ">
            {data ? (
              <div className="flex gap-4 items-center ">
                <div className="bg-white/10 dark:bg-[#222] transition-all duration-500 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
                  <RiUserCommunityFill />
                </div>
                <div className="">
                  <h1 className="text-xl text-black dark:text-white font-bold">
                    Community space
                  </h1>
                  <p className=" text-[12px] tracking-tight">
                    connect with more programmers out there and post whats on
                    your mind
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="w-full h-32 rounded-md"></Skeleton>
            )}
          </div>
          <div className=" backdrop-blur-2xl my-8 transition-all duration-500 bg-slate-50 dark:bg-[#111] p-5 rounded-md shadow-xl ">
            <div className="font-semibold">Recent Discussions</div>

            {data ? (
              discussionData.length > 0 ? (
                <div className=" p-4 backdrop:2xl transition-all duration-500 rounded-md m-2 ">
                  {discussionData.map((elem, idx) => (
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
              ) : (
                <p> Be the first one to comment here </p>
              )
            ) : (
              <Skeleton className="w-full h-screen" />
            )}
          </div>
          <div className="backdrop-blur-2xl my-8 bg-slate-200 dark:bg-white/10 p-5 rounded-md shadow-xl ">
            <div>Post what is in your mind</div>

            <Textarea></Textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityRooms;
