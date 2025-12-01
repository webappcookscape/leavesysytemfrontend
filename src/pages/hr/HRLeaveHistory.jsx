import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const HRLeaveHistory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaves/hr/history");
      setList(res.data);
    } catch (err) {
      console.error("HR leave history error:", err);
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
      <h2 className="text-xl font-semibold mb-4">Today's Leave History (HR)</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No decisions made today.</p>
      )}

      {list.map((l) => (
        <div key={l._id} className="bg-white border p-4 rounded-lg shadow mb-4">
          <div className="font-semibold text-lg">{l.employeeName}</div>

          <div className="text-sm text-gray-600">
            ID: {l.employee?.employeeId} • {l.employee?.email}
          </div>

          <div className="mt-1">
            📅 {new Date(l.fromDate).toLocaleDateString()} →{" "}
            {new Date(l.toDate).toLocaleDateString()}
          </div>

          <div className="mt-1 text-gray-800">📝 {l.reason}</div>

          <div className="mt-2">
            Status:{" "}
            <span
              className={
                l.hrDecision === "APPROVED"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {l.hrDecision}
            </span>
          </div>

          <div className="mt-1 text-sm text-gray-500">
            Decided at: {new Date(l.hrDecisionAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRLeaveHistory;
