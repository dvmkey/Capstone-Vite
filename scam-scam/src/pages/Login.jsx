import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    
    const requestBody = isNewUser 
      ? { email, password, confirmPassword: password, firstName, lastName, userType: "1" } 
      : { email, password };
    
    try {
      const response = await fetch(`/api/v1/auth${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include" 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.status === 'success' ? "Operation successful!" : data.message);
        
        if (!isNewUser && data.status === 'success') {
          console.log("Login successful");
          
          if (data.token) {
            localStorage.setItem('jwt', data.token);
          }
          
          setTimeout(() => {
            window.location.href = '';
          }, 1500);
        }
      } else {
        setError(data.message || "An unknown error occurred");
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
                {isNewUser && (
                  <>
                    <div className="form-group mb-3">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
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