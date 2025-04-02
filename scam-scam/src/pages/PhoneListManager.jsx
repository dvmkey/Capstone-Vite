import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const PhoneListManager = () => {
  const [whitelist, setWhitelist] = useState([
    { id: 1, number: "+1 (555) 123-4567", name: "Mom", notes: "Always answer" },
    { id: 2, number: "+1 (555) 765-4321", name: "Doctor's Office", notes: "Medical appointments" },
  ]);
  
  const [blacklist, setBlacklist] = useState([
    { id: 1, number: "+1 (888) 555-1234", name: "Spam Caller", notes: "Calls daily" },
    { id: 2, number: "+1 (800) 123-9876", name: "Telemarketer", notes: "Extended car warranty" },
  ]);

  const [activeTab, setActiveTab] = useState("whitelist");
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const addToList = (list) => {
    if (!newNumber) return;
    
    const newEntry = {
      id: list === "whitelist" ? whitelist.length + 1 : blacklist.length + 1,
      number: newNumber,
      name: newName || "Unnamed",
      notes: newNotes || "",
    };
    
    if (list === "whitelist") {
      setWhitelist([...whitelist, newEntry]);
    } else {
      setBlacklist([...blacklist, newEntry]);
    }
    
    setNewNumber("");
    setNewName("");
    setNewNotes("");
  };

  const removeFromList = (list, id) => {
    if (list === "whitelist") {
      setWhitelist(whitelist.filter(item => item.id !== id));
    } else {
      setBlacklist(blacklist.filter(item => item.id !== id));
    }
  };

  const moveToOtherList = (fromList, id) => {
    let item;
    if (fromList === "whitelist") {
      item = whitelist.find(entry => entry.id === id);
      setWhitelist(whitelist.filter(entry => entry.id !== id));
      setBlacklist([...blacklist, {...item, id: blacklist.length + 1}]);
    } else {
      item = blacklist.find(entry => entry.id === id);
      setBlacklist(blacklist.filter(entry => entry.id !== id));
      setWhitelist([...whitelist, {...item, id: whitelist.length + 1}]);
    }
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
      
      <h1 className="mb-4">Phone Number Management</h1>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === "whitelist" ? "active" : ""}`} 
            onClick={() => setActiveTab("whitelist")}
          >
            Whitelist
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === "blacklist" ? "active" : ""}`} 
            onClick={() => setActiveTab("blacklist")}
          >
            Blacklist
          </button>
        </li>
      </ul>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h3>Add New Number to {activeTab === "whitelist" ? "Whitelist" : "Blacklist"}</h3>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label htmlFor="number">Phone Number *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="number" 
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="name">Name (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contact Name"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="notes">Notes (Optional)</label>
                <textarea 
                  className="form-control" 
                  id="notes"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Additional information about this number"
                  rows="2"
                ></textarea>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => addToList(activeTab)}
              >
                Add to {activeTab === "whitelist" ? "Whitelist" : "Blacklist"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h3>{activeTab === "whitelist" ? "Whitelist" : "Blacklist"}</h3>
              <p className="mb-0">
                {activeTab === "whitelist" 
                  ? "These numbers will bypass the AI and ring directly to you." 
                  : "These numbers will always be answered by the AI."}
              </p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === "whitelist" ? whitelist : blacklist).map(item => (
                      <tr key={item.id}>
                        <td>{item.number}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-secondary"
                              title={item.notes}
                              data-toggle="tooltip"
                            >
                              View Notes
                            </button>
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => moveToOtherList(activeTab, item.id)}
                            >
                              Move to {activeTab === "whitelist" ? "Blacklist" : "Whitelist"}
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => removeFromList(activeTab, item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <a href="/" className="btn btn-outline-secondary">Back to Home</a>
      </div>
    </div>
  );
};

export default PhoneListManager;