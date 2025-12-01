// frontend/src/pages/employee/EmployeeHalfdayRequest.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const FALLBACK_HEADS = [
  { _id: "RH001", name: "Leo (COO)" },
  { _id: "RH002", name: "Ramya (HCF)" },
  { _id: "RH003", name: "Tamizh (BH)" },
];

const EmployeeHalfdayRequest = () => {
  const { user } = useContext(AuthContext);
  const [employeeName, setEmployeeName] = useState(user?.name || "");
  const [heads, setHeads] = useState([]);
  const [reportingHead, setReportingHead] = useState("");
  const [date, setDate] = useState("");
  const [half, setHalf] = useState("FIRST_HALF");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // store created doc or true

  useEffect(() => {
    const loadHeads = async () => {
      try {
        const res = await api.get("/users/heads");
        setHeads(res.data);
      } catch {
        setHeads(FALLBACK_HEADS);
      }
    };
    loadHeads();
    setEmployeeName(user?.name || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { employeeName, reportingHead, date, half, reason };
      const res = await api.post("/halfdays", body);
      setSuccess(res.data);
      setDate("");
      setHalf("FIRST_HALF");
      setReportingHead("");
      setReason("");
      // auto-hide popup after few sec
      setTimeout(()=> setSuccess(null), 3000);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Request Half-Day Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="employeeName" className="block text-sm font-medium">Employee Name</label>
            <input id="employeeName" name="employeeName" value={employeeName} onChange={e=>setEmployeeName(e.target.value)} required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div>
            <label htmlFor="reportingHead" className="block text-sm font-medium">Reporting Head</label>
            <select id="reportingHead" name="reportingHead" value={reportingHead} onChange={e=>setReportingHead(e.target.value)} required
              className="mt-1 w-full border rounded px-3 py-2">
              <option value="">-- Select --</option>
              {heads.map(h => <option key={h._id} value={h._id}>{h.name}{h.role ? ` (${h.role})` : ''}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Date</label>
              <input id="date" name="date" type="date" value={date} onChange={e=>setDate(e.target.value)} required
                className="mt-1 w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label htmlFor="half" className="block text-sm font-medium">Half</label>
              <select id="half" name="half" value={half} onChange={e=>setHalf(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
                <option value="FIRST_HALF">Morning (First Half)</option>
                <option value="SECOND_HALF">Afternoon (Second Half)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium">Reason (optional)</label>
            <textarea id="reason" name="reason" rows={3} value={reason} onChange={e=>setReason(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-indigo-600 text-white">
            {loading ? "Sending..." : "Submit Half-Day"}
          </button>
        </form>
      </div>

      {/* Success popup overlay */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setSuccess(null)} />
          <div className="relative bg-white rounded-2xl p-8 w-[420px] max-w-[90%] flex flex-col items-center">
            <svg className="w-28 h-28 mb-2 animate-pulse" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="56" stroke="#34d399" strokeWidth="8" fill="#dcfce7" />
              <path d="M34 62 L52 80 L86 44" stroke="#047857" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-lg font-bold">Request submitted</h3>
            <p className="text-sm text-gray-600 mt-2">Half-day request for {new Date(success.date).toLocaleDateString()} saved.</p>
            <button onClick={()=>setSuccess(null)} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHalfdayRequest;
