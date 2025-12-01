import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/cookscape-logo.png";

const TopNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="lg:hidden w-full p-4 bg-[#E30000] text-white shadow flex justify-between items-center">
      
      <div className="flex items-center gap-3">
        <img src={logo} alt="CookScape" className="h-10" />
        <div>
          <h1 className="text-lg font-bold">People Desk</h1>
          <p className="text-sm">{user?.name} · {user?.role}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-[#004B37] px-3 py-1 rounded hover:bg-green-900"
      >
        Logout
      </button>
    </div>
  );
};

export default TopNavbar;
