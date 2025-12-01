import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRPermHistory = () => {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/permissions/hr/history");
      setList(res.data);
    } catch (err) {
      console.error("HR history error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">HR Permission History</h2>

      {list.length === 0 && <p>No history available.</p>}

      {list.map((p) => (
        <div
          key={p._id}
          className="bg-white border p-4 rounded-md shadow mb-4"
        >
          {/* Employee Name + ID */}
          <div className="font-bold text-lg">
            {p.employee?.name} ({p.employee?.employeeId})
          </div>

          {/* Reporting Head */}
          <div className="text-sm text-gray-600 mt-1">
            👤 Reporting Head:{" "}
            <span className="font-medium">
              {p.reportingHead?.name || "Not Available"}
            </span>
          </div>

          {/* Date */}
          <div className="text-sm text-gray-600 mt-1">
            📅 {new Date(p.date).toLocaleDateString()}
          </div>

          {/* Time */}
          <div className="text-sm text-gray-600">
            🕒 {p.fromTime} → {p.toTime}
          </div>

          {/* Reason */}
          <div className="text-sm text-gray-600 mt-1">
            📝 Reason: {p.reason}
          </div>

          {/* Status */}
          <div className="text-sm font-semibold mt-2">
            Status:{" "}
            <span
              className={
                p.status === "APPROVED"
                  ? "text-green-600"
                  : p.status === "REJECTED"
                  ? "text-red-600"
                  : "text-gray-600"
              }
            >
              {p.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRPermHistory;
