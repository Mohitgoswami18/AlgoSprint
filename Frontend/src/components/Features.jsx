import React from 'react'

const Features = () => {

    const feature = [
      {
        logo: <i className="fa-brands text-5xl mb-4 fa-battle-net "></i>,
        title: "Coding Room",
        description: "battle with you friends, compete and grow together",
      },
      {
        logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
        title: "MCQ Rounds",
        description: "compete with quick round for revision",
      },
      {
        logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
        title: "Leaderboard",
        description: "climb Global learderboard with developers",
      },
      {
        logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
        title: "Collaborative Room",
        description: "Collaborative room for learning together",
      },
    ];

  return (
    <div className="bg-[#0e1d2e] font-[Inter] pt-22 ">
      <h1 className="text-[#F7FAFC]  text-center font-bold text-4xl">
        Master your programming Skills
      </h1>
      <p className="text-[#A0AEC0] font-semibold text-center text-sm pt-4">
        Everything you need to become pro at programming
      </p>

      <div className="flex mt-22 flex-wrap max-w-[1080px] justify-between mx-auto ">
        {feature.map((elem, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-2xl shadow-10 p-4 basis-[46%] m-3 rounded-md">
            <div className="flex flex-col">
              <p> {elem.logo} </p>
              <h1 className="font-bold text-lg mx-2 text-[#F7FAFC]">{elem.title}</h1>
            </div>
            <p className="text-sm text-[#A0AEC0] m-2">{elem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features
