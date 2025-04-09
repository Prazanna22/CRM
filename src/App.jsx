import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Dashboard/Dashboard"
import { LoginPage } from "./components/LoginPage";
import { Navbar } from "./components/Navbar";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        // <Router>
        //     <Routes>

        //         <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />


        //         <Route 
        //             path="/dashboard" 
        //             element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        //         />


        //         <Route path="*" element={<Navigate to="/login" />} />
        //     </Routes>
        // </Router>
        <>
            <div className="bg-black ">
                <Navbar />
                <Dashboard />
                {/* <LoginPage /> */}
            </div>
     </> 
    );
}

export default App;
