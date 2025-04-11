import { useState } from "react";
import UploadFile from "./UploadFile";
import { Navbar } from "../components/Navbar";
import { FaUpload, FaChevronLeft, FaChevronRight, FaHome, FaDatabase } from "react-icons/fa";
import { Home } from "./Home";
import { B2B } from "./B2B";
import { B2C } from "./B2C";
import { OutsourceDB } from "./OutsourceDB";
import { FaTable, FaTableList } from "react-icons/fa6";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
            <Navbar />
            <div className="flex  w-screen overflow-visible justify-start items-start ibm">
                <div className={`text-white flex flex-col justify-between px-2 fixed bg-black border-r-2 border-white z-30 h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-56'} overflow-hidden`}>


                    <div className="flex flex-col flex-grow gap-8 mt-5 ml-1 ">
                        <button className="py-2 px-4 my-2 flex items-center gap-4  justify-left " onClick={() => setIsCollapsed(!isCollapsed)}>
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
                        <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left ${activeSection === "home" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-black text-white"
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
                        <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left ${activeSection === "upload" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-black text-white"
                            }`}
                            onClick={() => setActiveSection("upload")}>

                            <span className="transition-all duration-300 ease-in-out transform" >
                                <FaUpload size={20} />
                            </span>
                            <span
                                className={`font-medium transition-all duration-300 ease-in-out origin-left ${isCollapsed ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 w-auto'
                                    } overflow-hidden whitespace-nowrap`}
                            >
                                Upload
                            </span>
                        </button>
                        <button className={`py-2 pl-4 flex items-center gap-4 my-2  justify-left ${activeSection === "b2b" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-black text-white"
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

                        <button className={`py-2 pl-4 flex items-center gap-4 my-2 justify-left ${activeSection === "b2c" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-black text-white"
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
                        <button className={`py-2 pl-4 flex items-center gap-4 my-2   justify-left ${activeSection === "outsource" ? "border-l-4 border-green-600 text-green-600 " : "border-l-4 border-black text-white"
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
