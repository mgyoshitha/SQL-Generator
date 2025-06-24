import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SQLGenerator from "./SQLGenerator";
import Login from "./Login";
import SignUp from "./SignUp";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/app" : "/login"} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/app"
          element={
            isLoggedIn ? <SQLGenerator /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;