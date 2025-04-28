import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aiModels, setAiModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [callStats, setCallStats] = useState({
    totalTimeOnCalls: 0,
    averageCallDuration: "0:00",
    mostUsedModel: "",
    modelAccuracy: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const storedName = localStorage.getItem('userName');
    
    if (token) {
      setIsLoggedIn(true);
      
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName("User");
      }
      
      fetchAIModels();
      
      fetchCallStatistics();
    }
  }, []);

  const fetchAIModels = async () => {
    setLoading(true);
    try {
      const personas = [
        { key: "genZ", description: "Energetic Gen Z persona" },
        { key: "texanDude", description: "Southern drawl, Texan vibes" },
        { key: "shaggy", description: "Zoinks! It's Shaggy from Scooby-Doo" },
        { key: "jackSparrow", description: "Savvy? It's the Captain himself!" }
      ];
      
      const models = [];
      for (const persona of personas) {
        const baseUrl = "https://aivoice-chatbox-185231488037.us-central1.run.app/incoming-call?persona=";
        const fullUrl = baseUrl + persona.key;
        
        try {
          const response = await fetch(fullUrl);
          if (response.ok) {
            models.push({
              id: persona.key,
              name: persona.key.charAt(0).toUpperCase() + persona.key.slice(1),
              description: persona.description,
              url: fullUrl
            });
          }
        } catch (error) {
          console.error(`Error loading persona ${persona.key}:`, error);
        }
      }
      
      setAiModels(models);
    } catch (error) {
      console.error("Failed to load AI Models:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallStatistics = async () => {
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
        calculateCallStats(data.result);
      }
    } catch (error) {
      console.error("Error fetching call statistics:", error);
    }
  };

  const calculateCallStats = (calls) => {
    if (!calls || calls.length === 0) {
      setCallStats({
        totalTimeOnCalls: 0,
        averageCallDuration: "0:00",
        mostUsedModel: "None",
        modelAccuracy: 0
      });
      return;
    }
    
    let totalMinutes = 0;
    const completedCalls = calls.filter(call => call.callEnd);
    
    completedCalls.forEach(call => {
      const startTime = new Date(call.callStart);
      const endTime = new Date(call.callEnd);
      const durationMinutes = (endTime - startTime) / (1000 * 60);
      totalMinutes += durationMinutes;
    });
    
    // Calculate average call duration
    const avgCallDuration = completedCalls.length > 0 ? totalMinutes / completedCalls.length : 0;
    const avgMinutes = Math.floor(avgCallDuration);
    const avgSeconds = Math.floor((avgCallDuration - avgMinutes) * 60);
    
    // Find most used model
    const modelCounts = {};
    calls.forEach(call => {
      if (!modelCounts[call.scammerName]) {
        modelCounts[call.scammerName] = 0;
      }
      modelCounts[call.scammerName]++;
    });
    
    let mostUsedModel = "None";
    let maxCount = 0;
    
    Object.entries(modelCounts).forEach(([model, count]) => {
      if (count > maxCount) {
        mostUsedModel = model;
        maxCount = count;
      }
    });
    
    // Calculate model accuracy (placeholder calculation)
    const modelAccuracy = 85; // Placeholder value since actual calculation is missing
    
    setCallStats({
      totalTimeOnCalls: totalMinutes,
      averageCallDuration: `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`,
      mostUsedModel,
      modelAccuracy
    });
  };

  const setAI = async (personaName) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }
      
      const url = "https://scam-scam-service-185231488037.us-central1.run.app/api/v1/users/set-preferences";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownedBy: userId,
          voice: personaName,
          prompt: ""
        })
      });
      
      if (response.ok) {
        setCurrentModel(personaName);
        alert(`AI model updated to: ${personaName}`);
      } else {
        throw new Error("Failed to update AI model");
      }
    } catch (error) {
      console.error("Error setting AI model:", error);
      alert("Failed to update AI model");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const formatTimeDisplay = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours} hrs ${minutes} mins`;
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">SCAM SCAM</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#feature-section">About</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/phone-list-manager">Whitelist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved-calls">Models</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved-calls">Saved Calls</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/performance">Performance</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </nav>

      {/* Welcome Message */}
      {isLoggedIn && (
        <div className="alert alert-success text-center mt-3">
          <h3>Welcome, {userName}!</h3>
          {currentModel && (
            <p>Current AI Model: {currentModel}</p>
          )}
        </div>
      )}

      {/* Main Section */}
      <header className="text-center my-5 container">
        <div className="home-section-box">
          <h1>SCAM SCAM</h1>
          <p>
            SCAM SCAM is a project that uses a GPT-powered AI chatbot to answer
            spam calls on behalf of users. In 2024, spam calls cost U.S. residents
            $25.4 billion. By using AI to engage with scammers, SCAM SCAM aims to
            reduce their profits and discourage spam calls.
          </p>
          {!isLoggedIn && <Link to="/login" className="btn btn-primary">Login</Link>}
        </div>
      </header>

      {/* Whitelist & Blacklist Section */}
      <section id="feature-section" className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="home-section-box">
              <h2>Whitelist</h2>
              <p>LIST OF WHITELISTED (ALLOWED) NUMBERS</p>
              <Link to="/phone-list-manager" className="btn btn-secondary">Add Number</Link>
            </div>
          </div>
          <div className="col-md-6 mb-4">
          <div className="home-section-box">
          <h2>Saved Calls</h2>
          <p>Select any of your past calls and see a full transcript.</p>
          <Link to="/saved-calls" className="btn btn-secondary">View Saved Calls</Link>
        </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="container my-5">
        <div className="home-section-box">
          <h2>Models</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="model-box">
                <h3>Texan Dude</h3>
                <p>Extremely western man.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="model-box">
                <h3>Jack Sparrow</h3>
                <p>Captain of the Black Pearl.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="model-box">
                <h3>Shaggy</h3>
                <p>Scared of ghosts and in love with food.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="container my-5">
        <div className="home-section-box">
          <h2>Performance of Your Models</h2>
          <p>
            Most Used: {callStats.mostUsedModel || "No model selected yet"} <br />
            Total Time on Calls: {formatTimeDisplay(callStats.totalTimeOnCalls)} <br />
            Average Time per Call: {callStats.averageCallDuration} minutes <br />
          </p>
          <Link to="/performance" className="btn btn-secondary">View Performance of Each Model</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;