import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const WhitelistBlacklistPage = () => {
  // Sample data
  const [whitelistedNumbers, setWhitelistedNumbers] = useState([
    { id: 1, number: "+1 (555) 123-4567", note: "Family member" },
    { id: 2, number: "+1 (555) 234-5678", note: "Work contact" },
    { id: 3, number: "+1 (555) 345-6789", note: "Doctor's office" }
  ]);

  const [blacklistedNumbers, setBlacklistedNumbers] = useState([
    { id: 1, number: "+1 (555) 987-6543", note: "Known scammer" },
    { id: 2, number: "+1 (555) 876-5432", note: "Telemarketer" },
    { id: 3, number: "+1 (555) 765-4321", note: "Spam caller" }
  ]);

  const [newNumber, setNewNumber] = useState("");
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState("whitelist");

  const handleAddNumber = (listType) => {
    if (!newNumber) return;
    
    const newItem = {
      id: listType === "whitelist" ? whitelistedNumbers.length + 1 : blacklistedNumbers.length + 1,
      number: newNumber,
      note: newNote
    };
    
    if (listType === "whitelist") {
      setWhitelistedNumbers([...whitelistedNumbers, newItem]);
    } else {
      setBlacklistedNumbers([...blacklistedNumbers, newItem]);
    }
    
    setNewNumber("");
    setNewNote("");
  };

  const handleRemoveNumber = (listType, id) => {
    if (listType === "whitelist") {
      setWhitelistedNumbers(whitelistedNumbers.filter(item => item.id !== id));
    } else {
      setBlacklistedNumbers(blacklistedNumbers.filter(item => item.id !== id));
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">SCAM SCAM</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/whitelist-blacklist">Phone Lists</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/models">Models</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/saved-calls">Saved Calls</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/performance">Performance</Link>
              </li>
            </ul>
            <Link className="btn btn-light" to="/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-5">
        <h1 className="mb-4">Manage Phone Numbers</h1>
        
        {/* Tab Navigation */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'whitelist' ? 'active' : ''}`} 
              onClick={() => setActiveTab('whitelist')}
            >
              Whitelist
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'blacklist' ? 'active' : ''}`} 
              onClick={() => setActiveTab('blacklist')}
            >
              Blacklist
            </button>
          </li>
        </ul>
        
        {/* Tab Content */}
        <div className="tab-content">
          {/* Whitelist */}
          <div className={`tab-pane ${activeTab === 'whitelist' ? 'active' : ''}`}>
            <div className="phone-list-container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Whitelist (Allowed Numbers)</h2>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWhitelistModal">
                  <i className="bi bi-plus-lg me-2"></i>Add Number
                </button>
              </div>
              
              <div className="mb-4">
                <p>Phone numbers on this list will always be connected directly to you, bypassing the AI assistant.</p>
              </div>
              
              {whitelistedNumbers.length > 0 ? (
                whitelistedNumbers.map(item => (
                  <div key={item.id} className="phone-number-item">
                    <div>
                      <div className="fw-bold">{item.number}</div>
                      {item.note && <div className="text-muted small">{item.note}</div>}
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleRemoveNumber('whitelist', item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="alert alert-info">No whitelisted numbers yet.</div>
              )}
            </div>
          </div>
          
          {/* Blacklist */}
          <div className={`tab-pane ${activeTab === 'blacklist' ? 'active' : ''}`}>
            <div className="phone-list-container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Blacklist (Blocked Numbers)</h2>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBlacklistModal">
                  <i className="bi bi-plus-lg me-2"></i>Add Number
                </button>
              </div>
              
              <div className="mb-4">
                <p>Phone numbers on this list will always be handled by your selected AI model.</p>
              </div>
              
              {blacklistedNumbers.length > 0 ? (
                blacklistedNumbers.map(item => (
                  <div key={item.id} className="phone-number-item">
                    <div>
                      <div className="fw-bold">{item.number}</div>
                      {item.note && <div className="text-muted small">{item.note}</div>}
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleRemoveNumber('blacklist', item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="alert alert-info">No blacklisted numbers yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Whitelist Number Modal */}
      <div className="modal fade" id="addWhitelistModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Whitelist Number</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="whitelistNumber" className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="whitelistNumber" 
                  placeholder="+1 (555) 123-4567"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="whitelistNote" className="form-label">Note (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="whitelistNote" 
                  placeholder="Family member, Doctor's office, etc."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                  handleAddNumber('whitelist');
                  // Close modal (requires Bootstrap JS)
                  document.getElementById('addWhitelistModal').classList.remove('show');
                  document.body.classList.remove('modal-open');
                  document.querySelector('.modal-backdrop').remove();
                }}
              >
                Add Number
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Blacklist Number Modal */}
      <div className="modal fade" id="addBlacklistModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Blacklist Number</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="blacklistNumber" className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="blacklistNumber" 
                  placeholder="+1 (555) 123-4567"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="blacklistNote" className="form-label">Note (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="blacklistNote" 
                  placeholder="Spam caller, Telemarketer, etc."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                  handleAddNumber('blacklist');
                  // Close modal (requires Bootstrap JS)
                  document.getElementById('addBlacklistModal').classList.remove('show');
                  document.body.classList.remove('modal-open');
                  document.querySelector('.modal-backdrop').remove();
                }}
              >
                Add Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitelistBlacklistPage;