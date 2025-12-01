// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { X } from "lucide-react";
import logo from "../assets/cookscape-logo.png";   // ⭐ Add your logo file

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-blue-500 hover:text-white";

  /* --------------------------------------------
     ROLE-BASED MENUS
  --------------------------------------------- */
  const menus = {
    EMPLOYEE: [
      { name: "Request Leave", path: "/employee/request" },
      { name: "Request Half-Day", path: "/employee/halfday" },
      { name: "Request Permission", path: "/employee/permission" },
    ],

    RH: [
      { name: "Leave Requests", path: "/rh/today-requests" },
      { name: "Leave History", path: "/rh/today-history" },
      { name: "Permission Requests", path: "/rh/perm-requests" },
      { name: "Permission History", path: "/rh/perm-history" },
      { name: "Half-Day Requests", path: "/rh/halfday-requests" },
      { name: "Half-Day History", path: "/rh/halfday-history" },
    ],

    HR: [
      { name: "Permission Requests", path: "/hr/perm-requests" },
      { name: "Permission History", path: "/hr/perm-history" },

      { name: "Leave Requests", path: "/hr/today-requests" },
      { name: "Leave History", path: "/hr/today-history" },

      { name: "Half-Day Requests", path: "/hr/halfday" },
      { name: "Half-Day History", path: "/hr/halfday-history" },

      { name: "Permission Report", path: "/hr/perm-report" },
      { name: "Leave Report", path: "/hr/report" },
      { name: "Half-Day Report", path: "/hr/halfday-report" },
    ],

    ADMIN: [
      { name: "Manage Users", path: "/admin/users" },
      { name: "System Logs", path: "/admin/logs" },
    ],
  };

  const userMenus = menus[user?.role] || [];

  return (
    <>
      {/* SIDEBAR (Desktop always visible / Mobile Slide Drawer) */}
      <div
        className={`
          fixed lg:static top-0 left-0 h-screen w-64 bg-slate-900 text-white shadow-xl 
          transform transition-transform duration-300 z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* HEADER + LOGO */}
        <div className="p-5 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* LOGO */}
            <img
              src={logo}
              alt="CookScape Logo"
              className="w-10 h-10 rounded-md object-cover"
            />

            <div>
              <h1 className="text-lg font-bold">People Desk</h1>
              <p className="text-gray-300 text-xs">CookScape Interiors</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={26} />
          </button>
        </div>

        {/* USER INFO */}
        <div className="px-5 py-3 border-b border-slate-700">
          <p className="text-gray-200 font-medium">{user?.name}</p>
          <p className="text-gray-400 text-xs mt-1">{user?.role}</p>
        </div>

        {/* MENU ITEMS */}
        <nav className="px-3 mt-4 space-y-2">
          {userMenus.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${isActive(
                item.path
              )}`}
            >
              {item.name}
            </Link>
          ))}

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="mt-8 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
