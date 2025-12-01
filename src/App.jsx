// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// Auth
import Login from "./pages/Login";

// Layout
import Layout from "./components/Layout";

// Employee Pages
import RequestLeave from "./pages/employee/RequestLeave";
import PermissionRequest from "./pages/employee/PermissionRequest";
import RequestHalfday from "./pages/employee/EmployeeHalfdayRequest";   // ✅ NEW

// Reporting Head Pages
import ReportingHeadRequests from "./pages/head/ReportingHeadRequests";
import LeaveHeadHistory from "./pages/head/LeaveHeadHistory";
import ReportingHeadPermissionRequests from "./pages/head/ReportingHeadPermissionRequests";
import PermissionHeadHistory from "./pages/head/PermissionHeadHistory";

import HeadHalfdayRequests from "./pages/head/RHHalfdayRequests"; // ✅ NEW
import HeadHalfdayHistory from "./pages/head/RHHalfdayHistory";   // ✅ NEW

// HR Pages
import HRTodayRequests from "./pages/hr/HRTodayRequests";
import HRLeaveHistory from "./pages/hr/HRLeaveHistory";
import HRPermRequests from "./pages/hr/HRPermRequests";
import HRPermHistory from "./pages/hr/HRPermHistory";
import LeaveReport from "./pages/hr/LeaveReport";
import PermissionReport from "./pages/hr/PermissionReport";

import HRHalfdayRequests from "./pages/hr/HRHalfdayRequests"; // ✅ NEW
import HRHalfdayHistory from "./pages/hr/HRHalfdayHistory";   // ✅ NEW
import HRHalfdayReport from "./pages/hr/HalfdayReport";     // ✅ NEW

const App = () => {
  const { user } = useContext(AuthContext);

  const getHome = () => {
    if (!user) return "/login";
    if (user.role === "EMPLOYEE") return "/employee/request";
    if (user.role === "RH") return "/rh/today-requests";
    if (user.role === "HR") return "/hr/today-requests";
    return "/login";
  };

  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to={getHome()} replace />} />

        {/* EMPLOYEE */}
        <Route path="employee/request" element={<RequestLeave />} />
        <Route path="employee/permission" element={<PermissionRequest />} />
        <Route path="employee/halfday" element={<RequestHalfday />} /> {/* ✅ NEW */}

        {/* REPORTING HEAD */}
        <Route path="rh/today-requests" element={<ReportingHeadRequests />} />
        <Route path="rh/today-history" element={<LeaveHeadHistory />} />
        <Route path="rh/perm-requests" element={<ReportingHeadPermissionRequests />} />
        <Route path="rh/perm-history" element={<PermissionHeadHistory />} />

        {/* NEW Half-Day (RH) */}
        <Route path="rh/halfday-requests" element={<HeadHalfdayRequests />} />  {/* ✅ */}
        <Route path="rh/halfday-history" element={<HeadHalfdayHistory />} />    {/* ✅ */}

        {/* HR */}
        <Route path="hr/today-requests" element={<HRTodayRequests />} />
        <Route path="hr/today-history" element={<HRLeaveHistory />} />
        <Route path="hr/perm-requests" element={<HRPermRequests />} />
        <Route path="hr/perm-history" element={<HRPermHistory />} />
        <Route path="hr/report" element={<LeaveReport />} />
        <Route path="hr/perm-report" element={<PermissionReport />} />

        {/* NEW Half-Day (HR) */}
        <Route path="hr/halfday" element={<HRHalfdayRequests />} />         {/* Approval */}
        <Route path="hr/halfday-history" element={<HRHalfdayHistory />} />  {/* History */}
        <Route path="hr/halfday-report" element={<HRHalfdayReport />} />    {/* CSV */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
