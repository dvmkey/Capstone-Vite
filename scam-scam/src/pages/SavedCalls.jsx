import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const SavedCalls = () => {
  const [calls] = useState([
    {
      id: 1,
      date: "Mar 1, 2025",
      time: "10:23 AM",
      number: "+1 (888) 555-4321",
      duration: "3:42",
      model: "70 Year Old Woman",
      scamType: "Tech Support",
      transcript: [
        { speaker: "Scammer", text: "Hello ma'am, I'm calling from Microsoft Technical Support. We've detected a virus on your computer." },
        { speaker: "AI", text: "Oh dear! A virus? That sounds terrible. What should I do?" },
        { speaker: "Scammer", text: "Don't worry, we can help you remove it. Are you in front of your computer right now?" },
        { speaker: "AI", text: "Well, I think so. Is it the big beige box under my desk? My grandson set it up for me last Christmas." },
        { speaker: "Scammer", text: "Yes, that's your computer. I need you to turn it on and follow some steps." },
        { speaker: "AI", text: "Oh my, I'm not very good with technology. Which button do I press? There are so many lights!" },
      ]
    },
    {
      id: 2,
      date: "Feb 28, 2025",
      time: "3:15 PM",
      number: "+1 (800) 123-7777",
      duration: "2:18",
      model: "Gullible Young Man",
      scamType: "IRS Scam",
      transcript: [
        { speaker: "Scammer", text: "This is Agent Johnson from the IRS. I'm calling about an outstanding tax liability that needs immediate attention." },
        { speaker: "AI", text: "Oh no! The IRS? I've never been in trouble with the government before! What did I do wrong?" },
        { speaker: "Scammer", text: "You have unpaid taxes from 2022-2023 and there's a warrant for your arrest unless you settle immediately." },
        { speaker: "AI", text: "Arrest?! I can't go to jail! I have a job interview tomorrow! How much do I owe? I'll pay anything!" },
      ]
    },
    {
      id: 3,
      date: "Feb 27, 2025",
      time: "11:42 AM",
      number: "+1 (855) 999-8765",
      duration: "4:05",
      model: "70 Year Old Woman",
      scamType: "Warranty Extension",
      transcript: []
    },
    {
      id: 4,
      date: "Feb 26, 2025",
      time: "9:30 AM",
      number: "+1 (877) 555-1234",
      duration: "1:53",
      model: "Other Model",
      scamType: "Credit Card Offer",
      transcript: []
    },
    {
      id: 5,
      date: "Feb 25, 2025",
      time: "2:15 PM",
      number: "+1 (866) 543-2109",
      duration: "2:37",
      model: "Gullible Young Man",
      scamType: "Social Security Scam",
      transcript: []
    },
  ]);

  const [selectedCall, setSelectedCall] = useState(null);
  const [filterModel, setFilterModel] = useState("all");
  const [filterScamType, setFilterScamType] = useState("all");

  const uniqueModels = [...new Set(calls.map(call => call.model))];
  const uniqueScamTypes = [...new Set(calls.map(call => call.scamType))];

  const filteredCalls = calls.filter(call => {
    return (filterModel === "all" || call.model === filterModel) && 
           (filterScamType === "all" || call.scamType === filterScamType);
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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Number</th>
                  <th>Duration</th>
                  <th>Model</th>
                  <th>Scam Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map(call => (
                  <tr 
                    key={call.id} 
                    className={selectedCall === call.id ? "table-primary" : ""}
                  >
                    <td>{call.date}</td>
                    <td>{call.time}</td>
                    <td>{call.number}</td>
                    <td>{call.duration}</td>
                    <td>{call.model}</td>
                    <td>{call.scamType}</td>
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
            <p className="mb-0">
              {calls.find(call => call.id === selectedCall).date} - {calls.find(call => call.id === selectedCall).time} | 
              {" "}{calls.find(call => call.id === selectedCall).number} | 
              Model: {calls.find(call => call.id === selectedCall).model}
            </p>
          </div>
          <div className="card-body">
            {calls.find(call => call.id === selectedCall).transcript.length > 0 ? (
              <div className="transcript-container">
                {calls.find(call => call.id === selectedCall).transcript.map((entry, index) => (
                  <div 
                    key={index} 
                    className={`message ${entry.speaker === "AI" ? "ai-message" : "scammer-message"}`}
                  >
                    <div className="message-header">
                      <strong>{entry.speaker}</strong>
                    </div>
                    <div className="message-body">
                      {entry.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                Transcript not available for this call.
              </div>
            )}
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-secondary">Export Transcript</button>
              <button className="btn btn-outline-danger">Report Number</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-3 mb-5">
        <a href="/" className="btn btn-outline-secondary">Back to Home</a>
      </div>
    </div>
  );
};

export default SavedCalls;