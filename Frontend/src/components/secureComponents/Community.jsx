import React from 'react'

const CommunityRooms = () => {
  const discussionsList = [
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2"
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2"
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2"
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2"
    },
    {
      title: "Best approach for dynamic programming problem",
      Author: "Vikram Singh",
      time: "12 ",
      replies: "2"
    },
  ]
  return (
    <div className="bg-[#0e1d2e] font-[Inter] p-5">
      <div className=" backdrop-blur-2xl bg-white/10 p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-white/10 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            👑
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-[#F7FAFC]">
              Community space
            </h1>
            <p className="text-[#A0AEC0] text-[12px] tracking-tight">
              connect with more programmers out there and post whats on your
              mind
            </p>
          </div>
        </div>
      </div>
      <div className=" backdrop-blur-2xl my-8 bg-white/10 p-5 rounded-md shadow-xl ">
        <div>Recent Discussions</div>

        <div className=" p-4 backdrop:2xl rounded-md m-2 ">
          {discussionsList.map((elem, idx) => (
            <div className="m-4 bg-white/10 rounded-md p-4">
              <h1 className="text-lg font-semibold text-[#F7FAFC]">
                {elem.title}
              </h1>
              <div className="flex gap-4 text-[#A0AEC0] text-[12px] tracking-tight">
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
          className="bg-black"
          cols={100}
          rows={6}
        ></textarea>
      </div>
    </div>
  );
}

export default CommunityRooms
