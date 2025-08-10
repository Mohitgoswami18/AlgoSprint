import { RiUserCommunityFill } from "react-icons/ri";
const CommunityRooms = () => {
  const discussionsList = [
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2",
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2",
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2",
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2",
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2",
    },
  ];
  return (
    <div className="bg-slate-200 text-black dark:text-white dark:bg-black/80 shadow-md font-[Inter] p-5">
      <div className=" backdrop-blur-2xl bg-white/60 dark:bg-[#111] p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center bg-white/10 dark:bg-[#222]">
          <div className="bg-white/10 dark:bg-[#222] backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
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
      <div className=" backdrop-blur-2xl my-8 bg-slate-50 dark:bg-[#111] p-5 rounded-md shadow-xl ">
        <div className="font-semibold">Recent Discussions</div>

        <div className=" p-4 backdrop:2xl rounded-md m-2 ">
          {discussionsList.map((elem, idx) => (
            <div className="m-4 bg-slate-100 dark:bg-[#222] shadow-md rounded-md p-4">
              <h1 className="text-lg font-semibold ">
                {elem.title}
              </h1>
              <div className="flex gap-4 text-[12px] tracking-tight">
                <p>by {elem.Author}</p>
                <p>💬 {elem.replies} replies</p>
                <p>{elem.time}h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="backdrop-blur-2xl my-8 bg-white/10 p-5 rounded-md shadow-xl ">
        <div>Post what is in your mind</div>

        <textarea
          name="post"
          id=""
          className="bg-black rounded-md"
          cols={100}
          rows={6}
        ></textarea>
      </div>
    </div>
  );
};

export default CommunityRooms;
