import React, { useState, useEffect, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const FALLBACK_HEADS = [
  { _id: "RH001", name: "Leo (COO)" },
  { _id: "RH002", name: "Ramya (HCF)" },
  { _id: "RH003", name: "Tamizh (BH)" },
  { _id: "RH004", name: "Rajkumar (BH)" },
  { _id: "RH005", name: "Pughazh (DM)" },
];

const RequestLeave = () => {
  const { user } = useContext(AuthContext);

  const [employeeName, setEmployeeName] = useState(user?.name || "");
  const [heads, setHeads] = useState([]);
  const [reportingHead, setReportingHead] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadHeads = async () => {
      try {
        const res = await api.get("/users/heads");
        setHeads(res.data);
      } catch (err) {
        setHeads(FALLBACK_HEADS);
      }
    };
    loadHeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { employeeName, reportingHead, fromDate, toDate, reason };
      const res = await api.post("/leaves", body);
      setSuccess(res.data);

      setReportingHead("");
      setFromDate("");
      setToDate("");
      setReason("");

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      alert(err?.response?.data?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Request Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="block text-sm font-medium">Employee Name</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Reporting Head</label>
            <select
              className="mt-1 w-full border rounded px-3 py-2"
              value={reportingHead}
              onChange={(e) => setReportingHead(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {heads.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                className="mt-1 w-full border rounded px-3 py-2"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                className="mt-1 w-full border rounded px-3 py-2"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              rows={3}
              className="mt-1 w-full border rounded px-3 py-2 resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white"
          >
            {loading ? "Submitting..." : "Submit Leave"}
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSuccess(null)}></div>

          <div className="relative bg-white rounded-2xl p-8 w-[420px] max-w-[90%] flex flex-col items-center">
            <svg
              className="w-28 h-28 mb-2 animate-pulse"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle cx="60" cy="60" r="56" stroke="#34d399" strokeWidth="8" fill="#dcfce7" />
              <path d="M34 62 L52 80 L86 44" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
            </svg>

            <h3 className="text-lg font-bold">Leave Submitted</h3>
            <p className="text-sm text-gray-600 mt-2">
              Leave request saved from {fromDate || "start"} to {toDate || "end"}.
            </p>

            <button
              onClick={() => setSuccess(null)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RequestLeave;
