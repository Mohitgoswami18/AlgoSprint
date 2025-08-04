import React from "react";
import logo from "../assets/images/logo.png"
const Feature3 = () => {
  return (
    <div className="bg-[#0e1d2e] font-[Inter] pt-22">
      <h1 className="text-4xl font-bold text-center text-[#F7FAFC]">
        Personalised Dashboard
      </h1>

      <img src={logo} alt="" />
      <p>Keep a track of your progress with you ownpersonalised dashboard </p>
      <li key={1}> win/loose Ratio</li>
      <li key={2}> total Macthes</li>
      <li key={3}> rank</li>
      <li key={4}> played for</li>
    </div>
  );
};

export default Feature3;
