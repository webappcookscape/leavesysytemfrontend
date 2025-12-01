import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const PermissionHeadHistory = () => {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/permissions/head/history");
      setList(res.data);
    } catch (err) {
      console.error("Permission head history error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Today's Permission History
      </h2>

      {list.length === 0 && (
        <p className="text-gray-500">No decisions made today.</p>
      )}

      {list.map((p) => (
        <div
          key={p._id}
          className="bg-white border p-4 rounded-lg shadow mb-4"
        >
          <div className="font-semibold">{p.employeeName}</div>

          <div className="text-gray-600 text-sm mt-1">
            📅 {new Date(p.date).toLocaleDateString()}
          </div>

          <div className="text-gray-600 text-sm">
            🕒 {p.fromTime} → {p.toTime}
          </div>

          <div className="text-gray-600 text-sm">
            📝 {p.reason}
          </div>

          <div className="mt-2">
            Status:{" "}
            <span
              className={
                p.headDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {p.headDecision}
            </span>
          </div>

          <div className="text-gray-500 text-xs mt-1">
            Decided at: {new Date(p.headDecisionAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionHeadHistory;
