import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { LoginPage } from "./components/LoginPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsAuthenticated(isLoggedIn);
    }, []);

    return (
        <div className="bg-black">
            <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <LoginPage setIsAuthenticated={setIsAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
