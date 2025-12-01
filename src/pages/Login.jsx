import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const user = await login({ employeeId, password });

      if (user.role === "EMPLOYEE") navigate("/employee/request");
      if (user.role === "RH") navigate("/rh/today-requests");
      if (user.role === "HR") navigate("/hr/today-requests");
      if (user.role === "ADMIN") navigate("/admin/users");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1a1c2e] to-[#111] relative overflow-hidden">

      {/* Floating Glow Orbs */}
      <div className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-[120px] opacity-20 -top-10 -left-10 animate-floatSlow"></div>
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-[150px] opacity-20 bottom-0 right-0 animate-floatSlow2"></div>

      {/* LOGIN CARD */}
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 
                 rounded-2xl p-8 animate-fadeIn scale-[0.98] hover:scale-100 transition-all duration-300"
      >
        {/* Brand Logo */}
        <div className="text-center mb-6 animate-slideDown">
          <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg animate-pulseSlow">
            CookScape
          </h1>
          <p className="text-gray-300 text-md -mt-1 tracking-wide">
            Interiors & Beyond
          </p>
        </div>

        {/* Login Title */}
        <h2 className="text-2xl font-bold mb-5 text-white text-center">
          Login
        </h2>

        {err && (
          <p className="text-red-400 bg-red-900/20 border border-red-700 text-sm mb-3 p-2 rounded-lg">
            {err}
          </p>
        )}

        {/* Employee ID */}
        <label htmlFor="employeeId" className="block font-medium text-sm text-gray-200">
          Employee ID
        </label>
        <input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="CS001"
          className="w-full border border-white/20 bg-white/10 text-white rounded-lg px-3 py-2 mb-4 
                     focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        {/* Password */}
        <label htmlFor="password" className="block font-medium text-sm text-gray-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-white/20 bg-white/10 text-white rounded-lg px-3 py-2 mb-6 
                     focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg 
                     transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="animate-pulse">Logging in...</span>
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* EXTRA: Background Animated Lines */}
      <div className="absolute inset-0 pointer-events-none bg-grid opacity-[0.04]"></div>
    </div>
  );
};

export default Login;
