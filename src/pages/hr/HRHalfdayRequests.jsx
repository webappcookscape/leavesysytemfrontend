// frontend/src/pages/hr/HRHalfdayRequests.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRHalfdayRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/halfdays/hr/requests");
      setList(res.data);
    } catch (err) {
      console.error("HR load error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const handleDecision = async (id, decision) => {
    try {
      await api.patch(`/halfdays/hr/${id}`, { decision });
      load();
    } catch (err) {
      alert("Decision failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">HR — Pending Half-Days (Head approved)</h2>
      {list.length === 0 && <p>No pending halfday approvals.</p>}
      {list.map(h => (
        <div key={h._id} className="bg-white p-4 rounded shadow mb-3">
          <div className="font-bold">{h.employeeName} {h.employee?.employeeId && `(${h.employee.employeeId})`}</div>
          <div className="text-sm text-gray-600">Date: {new Date(h.date).toLocaleDateString()} • {h.half === "FIRST_HALF" ? "Morning" : "Afternoon"}</div>
          <div className="text-sm mt-2">Reporting Head: {h.reportingHead?.name}</div>
          <div className="mt-3 flex gap-2">
            <button onClick={()=>handleDecision(h._id,'APPROVED')} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
            <button onClick={()=>handleDecision(h._id,'REJECTED')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRHalfdayRequests;
