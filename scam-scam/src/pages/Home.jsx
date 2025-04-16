import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.href = '/login';
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
              <Link className="nav-link" to="/phone-list-manager">Whitelist/Blacklist</Link>
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
              <h2>Blacklist</h2>
              <p>LIST OF BLACKLISTED (BLOCKED) NUMBERS</p>
              <Link to="/phone-list-manager" className="btn btn-secondary">Add Number</Link>
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
                <h3>70 Year Old Woman</h3>
                <p>A woman who has zero understanding of any technology.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="model-box">
                <h3>Gullible Young Man</h3>
                <p>Will genuinely fall for anything.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="model-box">
                <h3>Other Model</h3>
                <p>idk I can't think of another example.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Calls Section */}
      <section id="testimonial-section" className="container my-5">
        <div className="home-section-box">
          <h2>Saved Calls</h2>
          <p>Select any of your past calls and see a full transcript.</p>
          <Link to="/saved-calls" className="btn btn-secondary">View Saved Calls</Link>
        </div>
      </section>

      {/* Performance Section */}
      <section className="container my-5">
        <div className="home-section-box">
          <h2>Performance of Your Models</h2>
          <p>
            Most Used: 70 Year Old Woman <br />
            Average Time on Call: 1 minute 47 seconds <br />
            Average Accuracy of Model: 91%
          </p>
          <Link to="/performance" className="btn btn-secondary">View Performance of Each Model</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;