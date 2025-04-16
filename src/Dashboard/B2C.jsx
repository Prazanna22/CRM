import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export const B2C = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("year");

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
                const response = await fetch("https://8197-49-204-138-174.ngrok-free.app/food_APP/get_b2c/", {

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
        <div className="px-4 ">
              <h1 className="font-bold text-4xl text-green-600 text-center py-5">B2C</h1>
            <button
                onClick={() => exportToExcel(filteredData, "B2C_Leads")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 my-2 mr-4"
            >
                Export file
            </button>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="  border rounded border-white py-2 px-4 my-2 ">
                <option value="year" className="  bg-black">This Year</option>
                <option value="month" className=" bg-black">This Month</option>
                <option value="today" className="appearance-none focus:outline-none  bg-black">Today</option>
            </select>
            <div className="overflow-x-auto">
                <div className="max-h-[77vh] overflow-y-auto border border-gray-300">
                    <table className="w-full min-w-[1200px] border-collapse border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                {[
                                    "Full Name", "Phone Number", "Alternate Number", "Email", "Event Type",
                                    "Event Date", "Delivery Location", "Count", "Meal Service", "Dietary Options",
                                    "Service Choice", "Choice of Menu", "Existing Budget", "Preferred Budget",
                                    "Meeting Date", "Lead Status", "Status", "Remark", "Created At", "Lead Score", "Call ID"
                                ].map((header, index) => (
                                    <th key={index} className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider whitespace-nowrap">
                                        {header}
                                        {header === "Lead Score" && (
                                            <button onClick={handleSort} className="ml-2 px-1 text-sm">
                                                {sortOrder === "asc" ? "🔼" : "🔽"}
                                            </button>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody >
                            {Array.isArray(filteredData) && filteredData.length > 0 ? (
                                filteredData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.customer_name || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.contact_number}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.alternate_number || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.email || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.event_type || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.event_date_time ? new Date(row.event_date_time).toLocaleString() : "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.delivery_location || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.count || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.required_meal_service || "N/A"}</td>
                                        <td className="px-3 py-5 whitespace-nowrap text-sm text-gray-200">{row.dietary_options || "N/A"}</td>
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
                                    <td colSpan={21} className="text-center p-4 text-sm text-gray-500">
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


