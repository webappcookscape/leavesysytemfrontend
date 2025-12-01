// frontend/src/pages/hr/HRHalfdayHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRHalfdayHistory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/halfdays/hr/history");
      setList(res.data);
    } catch (err) {
      console.error("HR halfday history error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="text-gray-600">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Half-Day History (HR)</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No records found.</p>
      )}

      {list.map((h) => (
        <div key={h._id} className="bg-white border p-4 rounded-lg shadow mb-4">
          {/* EMPLOYEE NAME */}
          <div className="font-semibold text-lg">{h.employee?.name}</div>

          {/* ID + Email */}
          <div className="text-sm text-gray-600">
            ID: {h.employee?.employeeId} • {h.employee?.email}
          </div>

          {/* DATE + HALF */}
          <div className="mt-1">
            📅 {new Date(h.date).toLocaleDateString()} •{" "}
            {h.half === "FIRST_HALF" ? "Morning (First Half)" : "Afternoon (Second Half)"}
          </div>

          {/* REASON */}
          <div className="mt-1 text-gray-800">
            📝 {h.reason || "No reason provided"}
          </div>

          {/* HEAD DECISION */}
          <div className="mt-1 text-sm text-gray-700">
            Head: {h.reportingHead?.name} — Decision:{" "}
            <span
              className={
                h.headDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {h.headDecision}
            </span>
          </div>

          {/* HR DECISION */}
          <div className="mt-2">
            HR Status:{" "}
            <span
              className={
                h.hrDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {h.hrDecision}
            </span>
          </div>

          {/* TIME */}
          <div className="mt-1 text-sm text-gray-500">
            Decided at:{" "}
            {h.hrDecisionAt
              ? new Date(h.hrDecisionAt).toLocaleString()
              : "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRHalfdayHistory;
