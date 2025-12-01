import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ReportingHeadPermissionRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      // ✅ FIXED ROUTE (Correct backend route)
      const res = await api.get("/permissions/head/pending")


      setList(res.data);
    } catch (err) {
      console.error("Head permission load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await api.patch(`/permissions/head/${id}`, { decision });
      load();
    } catch (err) {
      console.error("Decision error:", err);
      alert("Failed to update");
    }
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Today's Permission Requests</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No permission requests today.</p>
      )}

      {list.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
        >
          <div className="font-semibold text-lg">
            {p.employee?.name} ({p.employee?.employeeId})
          </div>

          <div className="text-sm text-gray-600 mt-1">
            📅 Date: {new Date(p.date).toLocaleDateString()}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            🕒 {p.fromTime} → {p.toTime}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            📝 Reason: {p.reason}
          </div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => handleDecision(p._id, "APPROVED")}
              className="bg-green-600 text-white px-3 py-1 rounded-md"
            >
              Approve
            </button>
            <button
              onClick={() => handleDecision(p._id, "REJECTED")}
              className="bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportingHeadPermissionRequests;
