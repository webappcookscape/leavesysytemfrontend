import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRPermRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/permissions/hr/requests"); 
      setList(res.data);
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
      await api.patch(`/permissions/hr/${id}`, { decision });
      load();
    } catch (err) {
      alert("Failed to update HR decision");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">HR – Pending Permission Requests</h2>

      {list.length === 0 && <p>No pending permission requests.</p>}

      {list.map((p) => (
        <div key={p._id} className="bg-white p-4 rounded shadow-md mb-4">
          <div className="font-bold">{p.employee?.name}</div>

          <div className="text-sm">
            📅 {new Date(p.date).toLocaleDateString()}
          </div>

          <div className="text-sm">
            🕒 {p.fromTime} → {p.toTime}
          </div>

          <div className="text-sm">📝 Reason: {p.reason}</div>

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

export default HRPermRequests;
