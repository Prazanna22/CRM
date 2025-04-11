import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export const B2B = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("year");

    // const handleExport = async () => {
    //     try {
    //         const response = await fetch("https://f30b-49-204-133-60.ngrok-free.app/food_APP/export_b2b/", {
    //             method: "GET",
    //             headers: {
    //                 "ngrok-skip-browser-warning": "true",
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to export file");
    //         }

    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = "B2B_Leads.xlsx"; // or whatever name you want
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error("Export error:", error);
    //         alert("Failed to download export file.");
    //     }
    // };
    const exportToExcel = (data, fileName = "ExportedData") => {


        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, `${fileName}.xlsx`);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://30e6-49-205-86-196.ngrok-free.app/food_APP/get_b2b/", {
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
        <p className="text-center p-4 ">Loading...</p>
    </div>;
    if (error) return; <div className="flex justify-center items-center h-screen w-full">
        <p className="text-center p-4 text-red-500 flex justify-center">{error}</p>
    </div>

    const handleSort = () => {
        const sortedData = [...tableData].sort((a, b) => {
            const scoreA = a.lead_score || 0;
            const scoreB = b.lead_score || 0;
            return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
        });
        setTableData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

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
        <div className="p-4 mt-20">
            <button
               onClick={() => exportToExcel(filteredData, "B2C_Leads")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 my-2 mr-4"
            >
                Export file
            </button>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className=" rounded border border-white py-2 px-4 my-2 ">
                <option value="year" className="  bg-black">This Year</option>
                <option value="month" className=" bg-black">This Month</option>
                <option value="today" className="appearance-none focus:outline-none  bg-black">Today</option>
            </select>
            <div className="overflow-x-auto">
                <div className="max-h-[75vh]  border border-gray-300 overflow-y-auto">
                    <table className="w-full min-w-[1200px] border-collapse border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0  z-10">
                            <tr>
                                {["Name", "Contact Number", "Alternate Number", "Email", "Event Type", "Company Name", "Designation", "Delivery Location", "Count", "Required Meal Service", "Dietary Options", "Service Type", "Service Choice", "Choice of Menu", "Existing Budget", "Preferred Budget", "Meeting Date", "Lead Status", "Status", "Remark", "Created At", "Lead Score", "Call ID"].map((header, index) => (
                                    <th key={index} className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap">
                                        {header}
                                        {header === "Lead Score" && (
                                            <button onClick={handleSort} className="ml-1  px-1 ">
                                                {sortOrder === "asc" ? <FaArrowDown /> : <FaArrowUp />}
                                            </button>

                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.name || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.contact_number}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.alternate_number || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.email || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.event_type || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.company_name || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.designation || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.delivery_location || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.count || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.required_meal_service || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.dietary_options || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.service_type || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.service_choice || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.choice_of_menu || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.existing_menu_budget || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.prefered_menu_budget || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.meeting_date_time ? new Date(row.meeting_date_time).toLocaleString() : "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.lead_status || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.status || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.remark || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{new Date(row.created_at).toLocaleString()}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.lead_score}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.call_id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={23} className="text-center p-4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
