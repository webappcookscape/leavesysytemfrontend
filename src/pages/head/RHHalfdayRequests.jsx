// frontend/src/pages/head/RHHalfdayRequests.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const RHHalfdayRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/halfdays/head/requests");
      setList(res.data);
    } catch (err) {
      console.error("Head load error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const handleDecision = async (id, decision) => {
    try {
      await api.patch(`/halfdays/head/${id}`, { decision });
      load();
    } catch (err) {
      alert("Failed to update");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Reporting Head — Pending Half-Day Requests</h2>
      {list.length === 0 && <p>No pending requests for today.</p>}
      {list.map(h => (
        <div key={h._id} className="bg-white p-4 rounded shadow mb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold">{h.employeeName} {h.employee?.employeeId && `(${h.employee.employeeId})`}</div>
              <div className="text-sm text-gray-600">Date: {new Date(h.date).toLocaleDateString()} • {h.half === "FIRST_HALF" ? "Morning" : "Afternoon"}</div>
              <div className="text-sm mt-2">Reason: {h.reason || '—'}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={()=>handleDecision(h._id,'APPROVED')} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button onClick={()=>handleDecision(h._id,'REJECTED')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RHHalfdayRequests;
