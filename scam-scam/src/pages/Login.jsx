import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    
    const endpoint = isNewUser ? "/signup" : "/login";
    
    try {
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "omit" 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        if (!isNewUser) {
          console.log("Login successful");
        }
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      setError("Connection failed. Make sure the backend server is running.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="card">
            <div className="card-header bg-light">
              <h3 className="text-center">{isNewUser ? "Create Account" : "Login"}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : (isNewUser ? "Sign Up" : "Login")}
                  </button>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      setIsNewUser(!isNewUser);
                      setMessage(null);
                      setError(null);
                    }}
                  >
                    {isNewUser ? "Already have an account? Login" : "New user? Create account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <a href="/" className="btn btn-outline-secondary">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;