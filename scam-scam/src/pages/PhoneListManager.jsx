import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const apiRequest = async (url, method, body) => {
  const token = localStorage.getItem('jwt');
  
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <Link className="navbar-brand" to="/">SCAM SCAM</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/phone-list-manager">Whitelist/Blacklist</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/saved-calls">Saved Calls</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/performance">Performance</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const PhoneListManager = () => {
  const userId = localStorage.getItem('userId');
  const [whitelist, setWhitelist] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("whitelist");
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [error, setError] = useState(null);

  const fetchPhoneLists = async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const whitelistResponse = await apiRequest('/api/v1/app/pull-white', 'POST', {
        ownedBy: userId,
      });

      console.log("Whitelist response:", whitelistResponse);
      
      if (whitelistResponse.status === 'success') {
        const whitelistData = whitelistResponse.result || [];
        setWhitelist(whitelistData);
      }

      const phoneNumbersResponse = await apiRequest('/api/v1/app/pull-phone', 'POST', {
        ownedBy: userId,
      });

      console.log("Blacklist response:", phoneNumbersResponse);
      
      if (phoneNumbersResponse.status === 'success') {
        const blacklistData = phoneNumbersResponse.result || [];
        setBlacklist(blacklistData);
      }
    } catch (err) {
      setError('Failed to load phone lists');
      console.error('Error fetching phone lists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoneLists();
  }, [userId]);
  
  const addToList = async (list) => {
    if (!newNumber) return;
    
    try {
      let response;
      
      if (list === "whitelist") {
        response = await apiRequest('/api/v1/users/set-white', 'POST', {
          ownedBy: userId, 
          phoneNumber: newNumber
        });
        
        console.log("Add to whitelist response:", response);
        
        if (response.status === 'success') {
          await fetchPhoneLists();
        }
      } else {
        response = await apiRequest('/api/v1/users/set-phone', 'POST', {
          ownedBy: userId, 
          phoneNumber: newNumber
        });
        
        console.log("Add to blacklist response:", response);
        
        if (response.status === 'success') {
          await fetchPhoneLists();
        }
      }
      
      setNewNumber("");
      setNewName("");
      setNewNotes("");
      
    } catch (err) {
      setError(`Failed to add number to ${list}`);
      console.error(`Error adding number to ${list}:`, err);
    }
  };

  const removeFromList = async (itemId, listType) => {
    try {
      if (listType === "whitelist") {
        setWhitelist(whitelist.filter(item => item.id !== itemId));
      } else {
        setBlacklist(blacklist.filter(item => item.id !== itemId));
      }
      
    } catch (err) {
      setError(`Failed to remove number from ${listType}`);
      console.error(`Error removing number from ${listType}:`, err);
    }
  };

  return (
    <div className="container mt-4">
      <Header />
      
      {loading ? (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
              <button className="btn-close float-end" onClick={() => setError(null)}></button>
            </div>
          )}
          
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
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeTab === "whitelist" ? whitelist : blacklist).map((item, index) => (
                          <tr key={item.id || item.phoneNumber || index}>
                            <td>{item.phoneNumber}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-outline-danger"
                                  onClick={() => removeFromList(item.id || item.phoneNumber, activeTab)}
                                >
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {(activeTab === "whitelist" ? whitelist : blacklist).length === 0 && (
                          <tr>
                            <td colSpan="2" className="text-center">No entries found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Debug section */}
              <div className="card mt-3">
                <div className="card-header bg-light">
                  <h5>Debug Information</h5>
                </div>
                <div className="card-body">
                  <p>Whitelist entries: {whitelist.length}</p>
                  <p>Blacklist entries: {blacklist.length}</p>
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={fetchPhoneLists}
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <Link to="/" className="btn btn-outline-secondary">Back to Home</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneListManager;