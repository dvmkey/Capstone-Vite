import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const ModelPerformance = () => {
  const [models, setModels] = useState([]);
  const [callData, setCallData] = useState([]);
  const [timeRange, setTimeRange] = useState("month");
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTimeSaved: 0,
    avgCallDuration: 0
  });

  useEffect(() => {
    fetchCallData();
  }, []);

  useEffect(() => {
    if (callData.length > 0) {
      calculateModelStats();
    }
  }, [callData, timeRange]);

  const fetchCallData = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
    
      const response = await fetch("/api/v1/users/pull-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
        }),
      });
      
      const data = await response.json();
      if (data.status === "success") {
        setCallData(data.result);
      }
    } catch (error) {
      console.error("Error fetching call data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateModelStats = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === "year") {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    const filteredCalls = callData.filter(call => {
      const callDate = new Date(call.callStart);
      return callDate >= cutoffDate;
    });
    
    let totalMinutes = 0;
    
    const modelGroups = {};
    
    filteredCalls.forEach(call => {
      if (!call.callEnd) return; 
      
      const startTime = new Date(call.callStart);
      const endTime = new Date(call.callEnd);
      const durationMinutes = (endTime - startTime) / (1000 * 60);
      
      totalMinutes += durationMinutes;
      
      if (!modelGroups[call.scammerName]) {
        modelGroups[call.scammerName] = {
          id: call.scammerName,
          name: call.scammerName,
          totalMinutes: 0,
          callCount: 0,
          calls: []
        };
      }
      
      modelGroups[call.scammerName].totalMinutes += durationMinutes;
      modelGroups[call.scammerName].callCount += 1;
      modelGroups[call.scammerName].calls.push(call);
    });
    
    // Convert to array and calculate averages
    const modelStats = Object.values(modelGroups).map(model => {
      const avgDuration = model.callCount > 0 ? model.totalMinutes / model.callCount : 0;
      const avgMinutes = Math.floor(avgDuration);
      const avgSeconds = Math.floor((avgDuration - avgMinutes) * 60);
      
      return {
        ...model,
        averageDuration: `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`,      };
    });
    
    setModels(modelStats);
    
    // Calculate overall stats
    const avgCallDuration = filteredCalls.length > 0 ? totalMinutes / filteredCalls.length : 0;
    const avgMinutes = Math.floor(avgCallDuration);
    const avgSeconds = Math.floor((avgCallDuration - avgMinutes) * 60);
    
    setStats({
      totalTimeSaved: totalMinutes,
      avgCallDuration: `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`
    });
  };

  // Format minutes to hours and minutes
  const formatTimeDisplay = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours} hrs ${minutes} mins`;
  };

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
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">Loading performance data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Avg. Call Duration</th>
                    <th>Total Time on Calls</th>
                    <th>Calls Answered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map(model => (
                    <tr key={model.id}>
                      <td>{model.name}</td>
                      <td>{model.averageDuration}</td>
                      <td>{formatTimeDisplay(model.totalMinutes)}</td>
                      <td>{model.callCount}</td>
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
                  {models.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">No call data available for this time period</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {selectedModel && (
        <div className="card mb-4">
          <div className="card-header bg-light">
            <h3>{selectedModel} - Recent Calls</h3>
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
                  {models.find(m => m.id === selectedModel)?.calls.map(call => {
                    const startTime = new Date(call.callStart);
                    const endTime = call.callEnd ? new Date(call.callEnd) : new Date();
                    const durationMinutes = Math.floor((endTime - startTime) / (1000 * 60));
                    const durationSeconds = Math.floor(((endTime - startTime) / 1000) % 60);
                    const duration = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
                    
                    return (
                      <tr key={call.id}>
                        <td>{startTime.toLocaleDateString()}</td>
                        <td>Unknown Number</td>
                        <td>{duration}</td>
                        <td>{call.scammerDeal}</td>
                        <td>
                          <a href={`/saved-calls?id=${call.id}`} className="btn btn-sm btn-outline-secondary">
                            View Transcript
                          </a>
                        </td>
                      </tr>
                    );
                  })}
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
                <div className="display-4 mb-3">{formatTimeDisplay(stats.totalTimeSaved)}</div>
                <p className="lead">Total time saved from answering spam calls in the past {timeRange}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h3>Average Call Duration</h3>
            </div>
            <div className="card-body">
              <div className="text-center">
                <div className="display-4 mb-3">{stats.avgCallDuration}</div>
                <p className="lead">Average time spent per call</p>
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