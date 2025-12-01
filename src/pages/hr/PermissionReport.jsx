import React, { useState } from "react";
import api from "../../api/axios";

const PermissionReport = () => {
  const [month, setMonth] = useState("");

  const downloadReport = async () => {
    try {
      const res = await api.get(`/permissions/hr/report?month=${month}`, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `permission-report-${month}.csv`;
      a.click();
    } catch (err) {
      alert("Failed to download");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Permission Monthly Report</h2>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={downloadReport}
        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download CSV
      </button>
    </div>
  );
};

export default PermissionReport;
