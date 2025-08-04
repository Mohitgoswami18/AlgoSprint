// import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const WorkFlow = () => {
//   return (
//     <div className="mx-auto border-2 bg-[#0e1d2e] font-[Inter] pt-22 text-center border-black max-w-[600px]">
//       <h1 className="text-4xl text-[#F7FAFC] ">How does it works</h1>
//       <Tabs defaultValue="account" className="w-[400px]">
//         <TabsList>
//           <TabsTrigger value="account" className="">Create Account</TabsTrigger>
//           <TabsTrigger value="room">create Room </TabsTrigger>
//           <TabsTrigger value="setting">customize setting </TabsTrigger>
//           <TabsTrigger value="link">Share the Link </TabsTrigger>
//           <TabsTrigger value="go">start the room</TabsTrigger>
//         </TabsList>
//         <TabsContent value="account">
//           Create an account by signingup
//         </TabsContent>
//         <TabsContent value="room">create room of desired tech</TabsContent>
//         <TabsContent value="setting">
//           customize the setting based on your needs
//         </TabsContent>
//         <TabsContent value="link">
//           Share the link via whatsapp, sms, mail etc.
//         </TabsContent>
//         <TabsContent value="go">
//           the room will automatically begins after 3 seconds... have fun!!!
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default WorkFlow


import React from "react";
import {
  UserPlus,
  LayoutDashboard,
  Settings,
  Share2,
  Clock9,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Quickly create your account to get started.",
    color: "text-blue-500",
  },
  {
    icon: LayoutDashboard,
    title: "Create Room",
    description: "Spin up a game room with one click.",
    color: "text-green-500",
  },
  {
    icon: Settings,
    title: "Customize Settings",
    description: "Pick topics, difficulty & time limits.",
    color: "text-purple-500",
  },
  {
    icon: Share2,
    title: "Share Link",
    description: "Invite friends to join your room.",
    color: "text-yellow-500",
  },
  {
    icon: Clock9,
    title: "Room Starts",
    description: "Timer kicks in. Let the battle begin!",
    color: "text-red-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-br from-zinc-900 to-black py-20 px-6 md:px-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">🚀 How It Works</h2>

      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="bg-zinc-800 hover:bg-zinc-700 transition rounded-xl shadow-lg p-6 w-[280px] relative"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-700 mb-4">
                <Icon className={`w-7 h-7 ${step.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-300">{step.description}</p>

              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-pink-500 to-purple-500 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
