import { useEffect, useRef, useState } from "react";
import UploadFile from "./UploadFile";
import { Navbar } from "../components/Navbar";
import { FaUpload, FaChevronLeft, FaChevronRight, FaHome, FaDatabase, FaGetPocket } from "react-icons/fa";
import { Home } from "./Home";
import { B2B } from "./B2B";
import { B2C } from "./B2C";
import logo from '../assets/logo.png'
import { OutsourceDB } from "./OutsourceDB";
import { FaPersonRifle, FaTable, FaTableList } from "react-icons/fa6";
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
    const profileRef = useRef(null);
    const popupRef = useRef(null);
    const drawerRef = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          profileRef.current &&
          !profileRef.current.contains(event.target) &&
          popupRef.current &&
          !popupRef.current.contains(event.target)
        ) {
          setShowProfile(false);
        }
  
        if (
          drawerRef.current &&
          !drawerRef.current.contains(event.target) &&
          !event.target.closest("#burger-menu")
        ) {
          setMobileDrawerOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
      window.location.reload();
    };
  
    const HandlefetchData = async () => {
      try {
        const response = await fetch("https://hogist.com/food_APP/process-vapi-responses/", {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Data fetched successfully");
          console.log("Call result:", result);
        } else {
          alert("Failed to fetch");
        }
      } catch (error) {
        console.error("Error while fetch:", error);
      }
    };
  
    const handleMobileNavClick = (section) => {
      setActiveSection(section);
      setMobileDrawerOpen(false);
    };
  
    return (
      <div className="flex w-screen h-screen overflow-hidden text-white bg-black">
  
        {/* Left Sidebar (Desktop) */}
        <div className={`hidden md:flex flex-col justify-between px-2 fixed bg-black z-30 h-screen 
          ${isCollapsed ? 'w-22' : 'w-56'} transition-all duration-300 ease-in-out`}>
  
          <div className="flex flex-col flex-grow gap-6 my-5 ml-4 bg-gray-800 rounded-2xl">
            <div className="flex flex-col gap-3">
              <button className="py-2 px-2 my-2 flex items-center gap-4">
                <img src={logo} alt="img" className="w-10" />
                {!isCollapsed && <span className="font-medium">Hogist</span>}
              </button>
  
              <button onClick={() => setIsCollapsed(!isCollapsed)} className="py-2 px-4 flex items-center gap-4">
                {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
                {!isCollapsed && <span className="font-medium">Close</span>}
              </button>
  
              {[
                { id: "home", label: "Home", icon: <FaHome size={20} /> },
                { id: "upload", label: "Upload", icon: <FaUpload size={20} /> },
                { id: "b2b", label: "B2B", icon: <FaTable size={20} /> },
                { id: "b2c", label: "B2C", icon: <FaTableList size={20} /> },
                { id: "outsource", label: "OutSourceDB", icon: <FaDatabase size={20} /> },
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`py-2 pl-4 flex items-center gap-4 my-2 cursor-pointer 
                    ${activeSection === id ? "border-l-4 border-green-600 text-green-600" : "border-l-4 border-gray-800 text-white"}`}
                >
                  {icon}
                  {!isCollapsed && <span className="font-medium">{label}</span>}
                </button>
              ))}
  
              <button onClick={HandlefetchData} className="py-3 pl-4 flex items-center gap-4">
                <FaGetPocket size={20} />
                {!isCollapsed && <span className="font-medium">Fetch</span>}
              </button>
            </div>
  
            <div className="relative" ref={profileRef}>
              <button onClick={() => setShowProfile(!showProfile)} className="py-2 pl-4 flex items-center gap-4">
                <FaUser size={20} />
                {!isCollapsed && <span className="font-medium">Profile</span>}
              </button>
  
              {showProfile && (
                <div ref={popupRef} className="absolute bottom-14 left-4 w-40 bg-gray-800 p-4 rounded-lg shadow-md z-50">
                  <p className="text-sm text-gray-300 mb-2">Hogist</p>
                  <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-500">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Main content (right side) */}
        <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out 
          ${isCollapsed ? 'w-full md:ml-[5rem]' : 'w-full md:ml-[14rem]'}`}>
  
          {/* Mobile Topbar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-black">
            <button id="burger-menu" onClick={() => setMobileDrawerOpen(true)} className="text-xl">☰</button>
            <h1 className="text-lg font-semibold">Hogist</h1>
          </div>
  
          {/* Mobile Drawer */}
          {mobileDrawerOpen && (
            <div className="fixed inset-0 z-50  bg-opacity-60">
              <div
                ref={drawerRef}
                className="w-2/3 h-full bg-gray-900 text-white p-6 flex flex-col gap-4"
              >
                <button className="self-start text-white text-xl mb-4" onClick={() => setMobileDrawerOpen(false)}>✕</button>
                <img src={logo} alt="logo" className="w-10 mb-6" />
                <button onClick={() => handleMobileNavClick("home")} className="flex  items-center gap-6 mb-4"><FaHome size={20}/> Home</button>
                <button onClick={() => handleMobileNavClick("upload")} className="flex  items-center gap-6 mb-4"><FaUpload size={20} />Upload</button>
                <button onClick={() => handleMobileNavClick("b2b")} className="flex  items-center gap-6 mb-4"> <FaTable size={20} />  B2B</button>
                <button onClick={() => handleMobileNavClick("b2c")} className="flex  items-center gap-6 mb-4"> <FaTableList size={20} />  B2C</button>
                <button onClick={() => handleMobileNavClick("outsource")} className="flex  items-center gap-6 mb-4"><FaDatabase size={20} /> OutSourceDB</button>
                <button onClick={() => { HandlefetchData(); setMobileDrawerOpen(false); }} className="flex  items-center gap-6 mb-4"> <FaGetPocket size={20} /> Fetch</button>
                <button onClick={handleLogout} className="text-red-400 mt-auto flex  items-center gap-6 mb-4"><FaUser size={20} /> Logout</button>
              </div>
            </div>
          )}
  
          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6 bg-black">
            {activeSection === "home" && <Home />}
            {activeSection === "upload" && <UploadFile />}
            {activeSection === "b2b" && <B2B />}
            {activeSection === "b2c" && <B2C />}
            {activeSection === "outsource" && <OutsourceDB />}
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;