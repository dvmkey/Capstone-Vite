import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const SavedCalls = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [filterModel, setFilterModel] = useState("all");
  const [filterScamType, setFilterScamType] = useState("all");

  useEffect(() => {
    fetch("/api/v1/auth/pull-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: '888', 
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        setCalls(data.result); 
      }
    })
    .catch(error => console.error("Error fetching call data:", error));
  }, []);

  const uniqueModels = [...new Set(calls.map(call => call.scammerName))];
  const uniqueScamTypes = [...new Set(calls.map(call => call.scammerDeal))];

  const filteredCalls = calls.filter(call => {
    return (
      (filterModel === "all" || call.scammerName === filterModel) &&
      (filterScamType === "all" || call.scammerDeal === filterScamType)
    );
  });

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="/">SCAM SCAM</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>

      <h1 className="mb-4">Saved Calls</h1>

      <div className="card mb-4">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Call History</h3>
            <div className="d-flex">
              <div className="form-group mb-0 mr-2">
                <select 
                  className="form-control"
                  value={filterModel}
                  onChange={(e) => setFilterModel(e.target.value)}
                >
                  <option value="all">All Models</option>
                  {uniqueModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-0">
                <select 
                  className="form-control"
                  value={filterScamType}
                  onChange={(e) => setFilterScamType(e.target.value)}
                >
                  <option value="all">All Scam Types</option>
                  {uniqueScamTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Scammer Name</th>
                  <th>Deal</th>
                  <th>Special Notes</th>
                  <th>Call Start</th>
                  <th>Call End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map(call => (
                  <tr 
                    key={call.id} 
                    className={selectedCall === call.id ? "table-primary" : ""}
                  >
                    <td>{call.scammerName}</td>
                    <td>{call.scammerDeal}</td>
                    <td>{call.specialNotes}</td>
                    <td>{new Date(call.callStart).toLocaleString()}</td>
                    <td>{call.callEnd ? new Date(call.callEnd).toLocaleString() : "Ongoing"}</td>
                    <td>
                      <button 
                        className={`btn btn-sm ${selectedCall === call.id ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
                      >
                        {selectedCall === call.id ? "Hide Transcript" : "View Transcript"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedCall && (
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h3>Call Transcript</h3>
          </div>
          <div className="card-body">
            <pre>{calls.find(call => call.id === selectedCall)?.fullTranscript}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCalls;
