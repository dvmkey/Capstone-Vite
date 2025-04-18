import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PhoneListManager from "./pages/PhoneListManager";
import SavedCalls from "./pages/SavedCalls";
import ModelPerformance from "./pages/ModelPerformance";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/styles.css";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        <Route 
          path="/phone-list-manager" 
          element={
            <ProtectedRoute>
              <PhoneListManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/saved-calls" 
          element={
            <ProtectedRoute>
              <SavedCalls />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/performance" 
          element={
            <ProtectedRoute>
              <ModelPerformance />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;