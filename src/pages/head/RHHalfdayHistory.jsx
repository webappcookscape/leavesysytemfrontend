import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const RHHalfdayHistory = () => {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/halfdays/head/history");
      setList(res.data);
    } catch (err) {
      console.error("Head history error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Today's Half-Day History</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No decisions made today.</p>
      )}

      {list.map((h) => (
        <div
          key={h._id}
          className="bg-white border p-4 rounded-lg shadow mb-4"
        >
          {/* Employee Name */}
          <div className="font-semibold">{h.employeeName}</div>

          {/* Date + Half */}
          <div className="text-gray-600 text-sm mt-1">
            📅 {new Date(h.date).toLocaleDateString()} •{" "}
            {h.half === "FIRST_HALF" ? "Morning (First Half)" : "Afternoon (Second Half)"}
          </div>

          {/* Decision */}
          <div className="mt-2">
            Status:{" "}
            <span
              className={
                h.headDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : h.headDecision === "REJECTED"
                  ? "text-red-600 font-bold"
                  : "text-yellow-600 font-bold"
              }
            >
              {h.headDecision}
            </span>
          </div>

          {/* Decision Time */}
          <div className="text-gray-500 text-xs mt-1">
            Decided at:{" "}
            {h.headDecisionAt
              ? new Date(h.headDecisionAt).toLocaleTimeString()
              : "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RHHalfdayHistory;
