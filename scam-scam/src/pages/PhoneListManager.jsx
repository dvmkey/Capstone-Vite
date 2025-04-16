import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

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

  useEffect(() => {
    const fetchPhoneLists = async () => {
      if (!userId) return;
  
      try {
        setLoading(true);
  
        const whitelistResponse = await apiRequest('/api/v1/app/pull-white', 'POST', {
          ownedBy: userId,
        });
  
        if (whitelistResponse.status === 'success') {
          setWhitelist(whitelistResponse.result);
        }
  
        const phoneNumbersResponse = await apiRequest('/api/v1/app/pull-phone', 'POST', {
          ownedBy: userId,
        });
  
        if (phoneNumbersResponse.status === 'success') {
          setBlacklist(phoneNumbersResponse.result);
        }
      } catch (err) {
        setError('Failed to load phone lists');
        console.error('Error fetching phone lists:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPhoneLists();
  }, [userId]);
  

  const addToList = async (list) => {
    if (!newNumber) return;
    
    try {
      let response;
      
      if (list === "whitelist") {
        response = await apiRequest('/api/v1/user/set-white', 'POST', {
          ownedBy: user.id,
          phoneNumber: newNumber
        });
        
        if (response.status === 'success') {
          setWhitelist([...whitelist, {
            id: response.data.id,
            phoneNumber: response.data.phoneNumber,
            name: newName || "Unnamed",
            notes: newNotes || ""
          }]);
        }
      } else {
        response = await apiRequest('/api/v1/user/set-phone', 'POST', {
          ownedBy: user.id,
          phoneNumber: newNumber
        });
        
        if (response.status === 'success') {
          setBlacklist([...blacklist, {
            id: response.data.id,
            phoneNumber: response.data.phoneNumber,
            name: newName || "Unnamed",
            notes: newNotes || ""
          }]);
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
                        {(activeTab === "whitelist" ? whitelist : blacklist).map(item => (
                          <tr key={item.id}>
                            <td>{item.phoneNumber}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-outline-danger"
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
            </div>
          </div>
          
          <div className="text-center mt-3">
            <a href="/" className="btn btn-outline-secondary">Back to Home</a>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneListManager;