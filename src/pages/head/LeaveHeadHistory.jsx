import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const LeaveHeadHistory = () => {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/leaves/head/history");
      setList(res.data);
    } catch (err) {
      console.error("Head leave history error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Today's Leave History</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No decisions made today.</p>
      )}

      {list.map((l) => (
        <div
          key={l._id}
          className="bg-white border p-4 rounded-lg shadow mb-4"
        >
          <div className="font-semibold">{l.employeeName}</div>

          <div className="text-gray-600 text-sm mt-1">
            📅 {new Date(l.fromDate).toLocaleDateString()} →{" "}
            {new Date(l.toDate).toLocaleDateString()}
          </div>

          <div className="text-gray-600 text-sm">
            📝 Reason: {l.reason}
          </div>

          <div className="mt-2">
            Status:{" "}
            <span
              className={
                l.headDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {l.headDecision}
            </span>
          </div>

          <div className="text-gray-500 text-xs mt-1">
            Decided at: {new Date(l.headDecisionAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveHeadHistory;
