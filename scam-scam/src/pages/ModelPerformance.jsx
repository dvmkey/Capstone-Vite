import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const ModelPerformance = () => {
  const [models] = useState([
    {
      id: 1,
      name: "70 Year Old Woman",
      averageDuration: "2:36",
      callsAnswered: 124,
      accuracy: 91,
    },
    {
      id: 2,
      name: "Gullible Young Man",
      averageDuration: "3:42",
      callsAnswered: 98,
      accuracy: 86,
    },
    {
      id: 3,
      name: "Other Model",
      averageDuration: "1:13",
      callsAnswered: 42,
      accuracy: 72,
    }
  ]);

  const [timeRange, setTimeRange] = useState("month");
  const [selectedModel, setSelectedModel] = useState(null);

  // Example call data for the detailed view
  const callData = [
    { id: 1, date: "Feb 28, 2025", duration: "3:42", number: "+1 (888) 555-4321", scamType: "Tech Support" },
    { id: 2, date: "Feb 27, 2025", duration: "2:18", number: "+1 (800) 123-7777", scamType: "IRS Scam" },
    { id: 3, date: "Feb 26, 2025", duration: "4:05", number: "+1 (855) 999-8765", scamType: "Warranty Extension" },
    { id: 4, date: "Feb 25, 2025", duration: "1:53", number: "+1 (877) 555-1234", scamType: "Credit Card Offer" },
    { id: 5, date: "Feb 24, 2025", duration: "2:37", number: "+1 (866) 543-2109", scamType: "Social Security Scam" },
  ];

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
      
      <h1 className="mb-4">Model Performance</h1>
      
      <div className="card mb-4">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Performance Overview</h3>
            <div className="btn-group">
              <button 
                className={`btn btn-outline-primary ${timeRange === "week" ? "active" : ""}`}
                onClick={() => setTimeRange("week")}
              >
                Week
              </button>
              <button 
                className={`btn btn-outline-primary ${timeRange === "month" ? "active" : ""}`}
                onClick={() => setTimeRange("month")}
              >
                Month
              </button>
              <button 
                className={`btn btn-outline-primary ${timeRange === "year" ? "active" : ""}`}
                onClick={() => setTimeRange("year")}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Avg. Call Duration</th>
                  <th>Calls Answered</th>
                  <th>Accuracy</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map(model => (
                  <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.averageDuration}</td>
                    <td>{model.callsAnswered}</td>
                    <td>{model.accuracy}%</td>
                    <td>
                      <button 
                        className={`btn btn-sm ${selectedModel === model.id ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
                      >
                        {selectedModel === model.id ? "Hide Details" : "View Details"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {selectedModel && (
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h3>{models.find(m => m.id === selectedModel).name} - Recent Calls</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Number</th>
                    <th>Duration</th>
                    <th>Scam Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {callData.map(call => (
                    <tr key={call.id}>
                      <td>{call.date}</td>
                      <td>{call.number}</td>
                      <td>{call.duration}</td>
                      <td>{call.scamType}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary">
                          View Transcript
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h3>Time Saved</h3>
            </div>
            <div className="card-body">
              <div className="text-center">
                <div className="display-4 mb-3">14.2 hours</div>
                <p className="lead">Total time saved from answering spam calls in the past {timeRange}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h3>Scammer Effectiveness</h3>
            </div>
            <div className="card-body">
              <div className="text-center">
                <div className="display-4 mb-3">-73%</div>
                <p className="lead">Reduction in scammer success rate when interacting with your models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3 mb-5">
        <a href="/" className="btn btn-outline-secondary">Back to Home</a>
      </div>
    </div>
  );
};

export default ModelPerformance;