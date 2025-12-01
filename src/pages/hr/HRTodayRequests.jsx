// src/pages/hr/HRAllRequests.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRTodayRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      // ❗ NEW FIXED ROUTE → load ALL pending HR requests
      const res = await api.get("/leaves/hr/pending");

      setRequests(res.data);
    } catch (err) {
      console.error("HR load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await api.patch(`/leaves/hr/${id}`, { decision });
      load(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Decision failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-3">
        HR - All Pending Leave Requests
      </h2>

      {requests.length === 0 && <p>No pending leave requests.</p>}

      {requests.map((l) => (
        <div key={l._id} className="card mb-3 p-4 border rounded shadow-sm bg-white">

          <div className="font-bold text-lg">
            {l.employeeName}{" "}
            <span className="text-sm text-gray-500">
              ({l.employee?.employeeId})
            </span>
          </div>

          <div className="text-sm mt-1">
            📅 From: {new Date(l.fromDate).toLocaleDateString()}
          </div>

          <div className="text-sm">
            📅 To: {new Date(l.toDate).toLocaleDateString()}
          </div>

          <div className="text-sm">
            👤 Reporting Head: {l.reportingHead?.name}
          </div>

          <div className="text-sm">📝 Reason: {l.reason}</div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => handleDecision(l._id, "APPROVED")}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleDecision(l._id, "REJECTED")}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRTodayRequests;
