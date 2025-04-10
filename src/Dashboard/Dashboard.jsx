import { useState } from "react";
import UploadFile from "./UploadFile";
import { Navbar } from "../components/Navbar";
import { FaUpload, FaChartBar, FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { Home } from "./Home";
import { B2B } from "./B2B";
import { B2C } from "./B2C";
import { OutsourceDB } from "./OutsourceDB";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
          <Navbar />
        <div className="flex  w-screen overflow-visible justify-start items-start ibm">
            {/* Fixed Left Sidebar */}
            <div className={`text-white flex flex-col justify-between py-6 px-4 fixed  bg-black z-30 transition-all duration-300 ${isCollapsed ? 'w-20 h-full' : 'w-64 h-full'}`}>

                {/* Top Section (Expandable buttons) */}
                <div className="flex flex-col flex-grow gap-8 mt-5">
                    <button
                        className="py-3 px-4 flex items-center justify-center bg-green-600 rounded"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
                    </button>

                    <button className="py-3 px-4 flex items-center gap-4 border-2 border-green-600 rounded justify-left text-green-600"
                        onClick={() => setActiveSection("upload")}>
                        <FaUpload size={16}  /> {!isCollapsed && <span className="text-green-600 font-medium">Upload</span>}
                    </button>

                    <button className="py-3 px-4 flex items-center gap-4 bg-green-600 rounded justify-left"
                        onClick={() => setActiveSection("home")}>
                        <FaHome size={16} /> {!isCollapsed && <span className="text-white font-medium">Home</span>}
                    </button>

                    <button className="py-3 px-4 flex items-center gap-4 bg-green-600 rounded justify-left"
                        onClick={() => setActiveSection("b2b")}>
                        <FaChartBar size={16} /> {!isCollapsed && <span className="text-white font-medium">B2B</span>}
                    </button>

                    <button className="py-3 px-4 flex items-center gap-4 bg-green-600 rounded justify-left"
                        onClick={() => setActiveSection("b2c")}>
                        <FaChartBar size={16} /> {!isCollapsed && <span className="text-white font-medium">B2C</span>}
                    </button>
                    <button className="py-3 px-4 flex items-center gap-4 bg-green-600 rounded justify-left"
                        onClick={() => setActiveSection("outsource")}>
                        <FaChartBar size={16} /> {!isCollapsed && <span className="text-white font-medium">OutSourceDB</span>}
                    </button>
                </div>
            </div>
            

            {/* Fixed Right Content Wrapper */}
            <div className={`flex flex-col fixed right-0 top-0 h-screen transition-all duration-300 bg-black overflow-hidden ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'}`}>

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
