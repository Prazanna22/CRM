import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const OutsourceDB = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("year");
    const [start, setStart] = useState(false);


    const startCall = async () => {
        try {
            const response = await fetch("https://hogist.com/food_APP/outsource/", {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            
            const result = await response.json();
            setStart(true);

            if (response.ok) {
                // alert("Call process started successfully.");
                toast.success("Call started successfully!");
                console.log("Call result:", result);
            } else {
                toast.error("Failed to trigger call process.");
                // alert("Failed to trigger call process.");
            }
        } catch (error) {
            
            console.error("Error starting call process:", error);
            toast.error("Error starting call process:");
            // alert("An error occurred while starting the call process.");
        }
    };
    const stopCall = async () => {
        try {
            const response = await fetch("https://hogist.com/food_APP/outsource/", {
                method: "POST",
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });

            const result = await response.json();
            setStart(false)
            if (response.ok) {
                //alert("Call process stopped successfully.");
            toast.success("Call process stopped successfully");
            } else {
                //alert("Failed to stop the call process.");
                toast.error("Failed to stop the call process.");
            }
        } catch (error) {
            console.error("Error stopping call process:", error);
            toast.error("Error stopping call process:");
            // alert("An error occurred while trying to stop the call process.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://hogist.com/food_APP/outsource/", {

                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "true"
                    },
                })
                const res = await response.json();
                console.log("FULL Response:", res);
                setTableData(Array.isArray(res) ? res : []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to load data.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    if (loading) return <div className="flex justify-center items-center h-screen w-full">
           <span className="loader"></span>
    </div>;
    if (error) return; <div className="flex justify-center items-center h-screen w-full">
        <p className="text-center p-4 text-red-500 flex justify-center">{error}</p>
    </div>

    const filteredData = tableData.filter((row) => {
        const createdData = new Date(row.created_at);
        const now = new Date();

        if (filter === "today") {
            return createdData.toDateString() === now.toDateString();
        }
        else if (filter === "month") {
            return createdData.getMonth() === now.getMonth() && createdData.getFullYear() === now.getFullYear()
        }
        else if (filter === "year") {
            return createdData.getFullYear() === now.getFullYear()
        }
        return true;
    })


    return (
        <div className="px-4 pt-5 ibm">
            <h1 className="font-bold text-4xl text-green-600 text-center py-5">OutSource Database</h1>
            <div className="flex justify-between gap-10">

                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="cursor-pointer  border rounded border-white py-1 px-4 my-2 ">
                    <option value="year" className=" cursor-pointer bg-black">This Year</option>
                    <option value="month" className="cursor-pointer bg-black">This Month</option>
                    <option value="today" className=" cursor-pointer appearance-none focus:outline-none  bg-black">Today</option>
                </select>
                <div className="flex flex-col md:flex-row md:gap-5 ">
                    <button className="bg-red-600 text-white px-4 py-1 text-md rounded cursor-pointer hover:bg-red-700 my-2 " onClick={stopCall}>
                        Stop Call
                    </button>
                    <button
                        onClick={startCall}
                        disabled={start}
                        className={`px-4 py-1 text-md rounded my-2 cursor-pointer ${start
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        {start ? "Calling..." : "Start Call"}
                    </button>

                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[74vh] overflow-y-auto border border-gray-300">
                    <table className="w-full min-w-[1200px] border-collapse border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                {[
                                    "Name", "Organization", "Designation", "Address",
                                    "Contact Number", "Email", "Status", "Source",
                                    "Created At"
                                ].map((header, index) => (
                                    <th key={index} className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredData) && filteredData.length > 0 ? (
                                filteredData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.name || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.org_name || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.designation || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.Address || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.contact_number}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.mail_id || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.status || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.source_come_from || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{new Date(row.created_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center p-4 text-sm text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


