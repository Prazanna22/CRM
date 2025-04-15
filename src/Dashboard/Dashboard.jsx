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
    const [isActive, setIsActive] = useState(false);
    const profileRef = useRef(null);
    const popupRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            profileRef.current &&
            !profileRef.current.contains(event.target) &&
            popupRef.current &&
            !popupRef.current.contains(event.target)
          ) {
            setIsActive(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
      

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        window.location.reload(); // ⬅️ reload to reset state in App
    };
    const HandlefetchData = async () => {
        try {
            const response = await fetch("https://fe50-49-204-118-43.ngrok-free.app/food_APP/process-vapi-responses/", {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });

            const result = await response.json();

            console.log("Call result:", result);
            if (response.ok) {
                alert("Data fetched successfully");
                console.log("Call result:", result);
            } else {
                alert("Failed to fetch");
            }
        } catch (error) {
            console.error("Error while fetch:", error);
            //   alert("An error occurred while fetch.");
        }
    };

    return (
        <>
            <div className="flex  w-screen overflow-visible justify-start items-start ibm">
                <div className={`text-white flex flex-col justify-between px-2 fixed bg-black  z-30 h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-22' : 'w-56'} overflow-hidden`}>
                    <div className="flex flex-col flex-grow gap-6 my-5 ml-4 overflow-visible justify-between bg-gray-800 rounded-2xl ">
                        <div className="flex flex-col flex-grow gap-3">
                        <button className="py-2 px-2 my-2 flex items-center gap-4  justify-left cursor-pointer" >
                        <img src={logo} alt="img" className="w-10"/>
                               
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Hogist
                                </span>
                            </button>
                            <button className="py-2 px-4 my-2 flex items-center gap-4  justify-left cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Close
                                </span>
                            </button>
                            <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left cursor-pointer ${activeSection === "home" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-gray-800 text-white"
                                }`}
                                onClick={() => setActiveSection("home")}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaHome size={20} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Home
                                </span>
                            </button>
                            <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left cursor-pointer ${activeSection === "upload" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-gray-800 text-white"
                                }`}
                                onClick={() => setActiveSection("upload")}>

                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaUpload size={20} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left  ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Upload
                                </span>
                            </button>
                            <button className={`py-2 pl-4 flex items-center gap-4 my-2  justify-left cursor-pointer ${activeSection === "b2b" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-gray-800 text-white"
                                }`}
                                onClick={() => setActiveSection("b2b")}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaTable size={20} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    B2B
                                </span>
                            </button>

                            <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left cursor-pointer ${activeSection === "b2c" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-gray-800 text-white"
                                }`}
                                onClick={() => setActiveSection("b2c")}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaTableList size={20} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    B2C
                                </span>
                            </button>
                            <button className={`py-2 pl-4 flex items-center gap-4 my-2   justify-left cursor-pointer ${activeSection === "outsource" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-gray-800 text-white"
                                }`}
                                onClick={() => setActiveSection("outsource")}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaDatabase size={20} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    OutSouceDB
                                </span>
                            </button>

                        </div>
                        <div className="flex flex-col ">
                            <button className={`py-3 pl-4 px-1 flex items-center gap-4 my-2 cursor-pointer  justify-left  "
                            }`}
                                onClick={HandlefetchData}>
                                <span className="transition-all duration-300 ease-in-out transform" >
                                    <FaGetPocket size={24} />
                                </span>
                                <span
                                    className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Fetch
                                </span>
                            </button>
                            <div className="relative z-50 overflow-visible" ref={profileRef}>
                                <button
                                    className="py-2 pl-4 flex items-center gap-4 my-2 justify-left cursor-pointer"
                                    onClick={() => setIsActive((prev) => !prev)}
                                >
                                    <span className="transition-all duration-300 ease-in-out transform">
                                        <FaUser size={20} />
                                    </span>
                                    <span
                                        className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? "opacity-0 scale-x-0 w-0" : "opacity-100 scale-x-100 w-auto"
                                            } overflow-hidden whitespace-nowrap`}
                                    >
                                        Profile
                                    </span>
                                </button>

                            </div>
                        </div>
                        {isActive && (
                            <div className="fixed left-[1.5rem] -bottom-6 translate-y-[-100%] w-42 bg-[#1f1f1f] text-white rounded-lg shadow-xl z-[9999]" ref={popupRef}>
                                <div className="p-4 border-b border-gray-700">
                                    <p className="text-sm font-medium text-gray-300">Hogist</p>
                                </div>
                                <div className="px-4 py-3 border-t border-gray-700">
                                    <button
                                        onClick={handleLogout}
                                        className="text-left w-full text-sm text-red-400 hover:text-red-500 font-semibold transition"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* Fixed Right Content Wrapper */}
                <div className={`flex flex-col fixed right-0 top-0 h-screen transition-all duration-300 ease-in-out bg-black overflow-hidden ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-14rem)]'}`}>

                    {/* Scrollable Content */}
                    <div className="px-6 mt-0 overflow-auto h-full bg-black text-white">
                        {activeSection === "upload" && <UploadFile />}
                        {activeSection === "home" && <Home />}
                        {activeSection === "b2b" && <B2B />}
                        {activeSection === "b2c" && <B2C />}
                        {activeSection === "outsource" && <OutsourceDB />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
