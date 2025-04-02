import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PhoneListManager from "./pages/PhoneListManager";
import SavedCalls from "./pages/SavedCalls";
import ModelPerformance from "./pages/ModelPerformance";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/phone-list-manager" element={<PhoneListManager />} />
        <Route path="/saved-calls" element={<SavedCalls />} />
        <Route path="/performance" element={<ModelPerformance />} />
      </Routes>
    </Router>
  );
}

export default App;