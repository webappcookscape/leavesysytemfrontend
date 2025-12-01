import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ReportingHeadRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
const res = await api.get("/leaves/head/today-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Head load", err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const decide = async (id, decision) => {
    try {
      await api.patch(`/leaves/head/${id}`, { decision });
      load();
    } catch (err) {
      console.error(err); alert('Failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-3">Requests Assigned To You</h2>
      {requests.length === 0 && <p>No pending requests.</p>}
      {requests.map(r=>(
        <div key={r._id} className="card mb-3">
          <div><b>{r.employeeName}</b> ({r.employee?.employeeId})</div>
          <div>From: {new Date(r.fromDate).toLocaleDateString()} To: {new Date(r.toDate).toLocaleDateString()}</div>
          <div>Reason: {r.reason}</div>
          <div className="mt-2">
            <button onClick={()=>decide(r._id,'APPROVED')} className="px-3 py-1 bg-green-600 text-white rounded mr-2">Approve</button>
            <button onClick={()=>decide(r._id,'REJECTED')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportingHeadRequests;
