import React, { useState, useEffect, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

// 🎯 Animation component
const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="animate-pop bg-white px-8 py-6 rounded-2xl shadow-xl text-center">
        <div className="text-green-600 text-5xl mb-3">✔</div>
        <p className="font-semibold text-lg">{message}</p>
        <button
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const PermissionRequest = () => {
  const { user } = useContext(AuthContext);
  const [employeeName, setEmployeeName] = useState(user?.name || "");
  const [heads, setHeads] = useState([]);
  const [reportingHead, setReportingHead] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const timeOptions = [
    "08:00 AM","08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM","10:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM",  "03:30 PM",
    "04:00 PM" , "04:30 PM",  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM"
  ];

  const FALLBACK_HEADS = [
    { _id: "RH001", name: "Leo (COO)" },
    { _id: "RH002", name: "Ramya (HCF)" },
    { _id: "RH003", name: "Tamizh (BH)" },
    { _id: "RH004", name: "Rajkumar (BH)" },
    { _id: "RH005", name: "Pughazh (DM)" }
  ];

  const loadHeads = async () => {
    try {
      const res = await api.get("/users/heads");
      setHeads(res.data);
    } catch {
      setHeads(FALLBACK_HEADS);
    }
  };

  useEffect(() => {
    loadHeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/permissions", {
        employeeName,
        reportingHead,
        date,
        fromTime,
        toTime,
        reason,
      });

      setSuccess(true);

      // Reset form
      setReportingHead("");
      setDate("");
      setFromTime("");
      setToTime("");
      setReason("");

    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[92vh] bg-gray-100 p-4">

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
          Request 2-Hour Permission
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Employee Name</label>
            <input
              value={employeeName}
              disabled
              className="w-full px-4 py-2 border rounded-xl bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Reporting Head</label>
            <select
              value={reportingHead}
              onChange={(e) => setReportingHead(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
              required
            >
              <option value="">Select</option>
              {heads.map((h) => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">From Time</label>
              <select
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl"
                required
              >
                <option value="">Select</option>
                {timeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">To Time</label>
              <select
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl"
                required
              >
                <option value="">Select</option>
                {timeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {success && (
        <SuccessPopup
          message="Permission Submitted Successfully!"
          onClose={() => setSuccess(false)}
        />
      )}

      {/* Popup animation */}
      <style>
        {`
          .animate-pop {
            animation: pop 0.4s ease-out;
          }
          @keyframes pop {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default PermissionRequest;
