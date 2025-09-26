import { Outlet, } from "react-router-dom"
import Navbar from "./Navbar"
import AuthFeture from "./AuthFeture"

const AuthenticationLayout = () => {
  return (
    <div className="w-100% font-[Inter]">
      <Navbar></Navbar>
      <div className="flex items-center px-4 justify-center w-full">
        <div className="basis-[30%] w-full">
          <Outlet></Outlet>
        </div>
        <div className="basis-[70%] w-full">
          <AuthFeture />
        </div>
      </div>
    </div>
  );
}

export default AuthenticationLayout
