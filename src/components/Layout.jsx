import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import logo from "../assets/cookscape-logo.png";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">

      {/* SIDEBAR */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE NAVBAR */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#E30000] text-white shadow">
          <img src={logo} className="h-10" alt="CookScape" />
          <button onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
