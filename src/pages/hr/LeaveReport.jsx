import React, { useState } from "react";
import api from "../../api/axios";

const LeaveReport = () => {
  const [month, setMonth] = useState("");

  const downloadReport = async () => {
    try {
      if (!month) return alert("Select a month");

      const res = await api.get(`/leaves/hr/report?month=${month}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `leave-report-${month}.csv`;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download report");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Leave Monthly Report</h2>

      <div className="flex gap-3">
        <input
          type="month"
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button
          onClick={downloadReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default LeaveReport;
