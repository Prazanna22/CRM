// import React, { useEffect, useState } from 'react';
// import { BiUser } from 'react-icons/bi';

// export const WhatsappChatBot = () => {
//     const [contacts, setContacts] = useState([]);
//     const [selectedNumber, setSelectedNumber] = useState(null);
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Mock contact numbers
//         setContacts([
//             "+919000000001",
//             "+919000000002",
//             "+919000000003"
//         ]);
//     }, []);

//     const sampleChats = {
//         "+919000000001": `User: Hi\nBot: Hello! How can I help you?\nUser: I want to place an order.\nBot: Great! What would you like to order?`,
//         "+919000000002": `User: Hello\nBot: Hi! Are you looking for bulk food?\nUser: Yes\nBot: I can help you with that.`,
//         "+919000000003": `User: Hey\nBot: Welcome to Hogist!`,
//     };

//     const fetchConversation = (number) => {
//         const chat_text = sampleChats[number] || "No chat available.";
//         const lines = chat_text.split("\n").filter(Boolean);
//         const parsed = lines.map(line => {
//             const [sender, ...rest] = line.split(":");
//             return {
//                 sender: sender.trim().toLowerCase(),
//                 message: rest.join(":").trim()
//             };
//         });
//         setMessages(parsed);
//         setSelectedNumber(number);
//     };

//     return (
//         <>
//         <div className="py-6 px-4">
//         <div className="flex w-full h-[93vh] text-white  border border-gray-800  ">
//             {/* Left Panel - Contacts */}
//             <div className="w-1/3 border border-gray-600 overflow-y-auto">
//                 <h2 className="text-lg font-semibold p-4 border-b border-gray-800">Chat Contacts</h2>
//                 {contacts.map((number) => (
//                     <button
//                         key={number}
//                         onClick={() => fetchConversation(number)}
//                         className={`w-full text-left px-4 py-4  cursor-pointer ${
//                             selectedNumber === number ? 'bg-gray-800 font-bold' : ''
//                         }`}
//                     >
//                         {number}
//                     </button>
//                 ))}
//             </div>

//             {/* Right Panel - Messages */}
//             <div className="w-2/3 px-6 overflow-y-auto text-white">
//             <div className="flex items-center gap-2">
//                 <h1 className='bg-green-600 p-2 rounded-full'><BiUser size={20} /> </h1>
//                 <h2 className="text-lg font-semibold my-4 ">Conversation with {selectedNumber}</h2>
//             </div>
                
//                 <div className="space-y-2">
//                     {messages.length === 0 && <p>Select a contact to view the chat</p>}
//                     {messages.map((msg, idx) => (
//                         <div
//                             key={idx}
//                             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
//                                     msg.sender === "user"
//                                         ? "bg-green-600 text-white rounded-br-none"
//                                         : "bg-gray-200 text-black rounded-bl-none"
//                                 }`}
//                             >
//                                 {msg.message}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         </div>
//         </>
//     );
// };




import React, { useEffect, useState } from 'react';

export const WhatsappChatBot = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const fetchContacts = async () => {
    //         try {
    //             const res = await fetch("https://hogist.com/food-api/chatbot-contacts/");
    //             const data = await res.json();
    //             setContacts(data.numbers);
    //         } catch (err) {
    //             console.error("Failed to load contacts:", err);
    //         }
    //     };
    //     fetchContacts();
    // }, []);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const [resB2B, resB2C] = await Promise.all([
                    fetch("https://hogist.com/food-api/get_b2b/"),
                    fetch("https://hogist.com/food-api/get_b2c/")
                ]);
    
                const dataB2B = await resB2B.json();
                const dataB2C = await resB2C.json();
    
                const b2bNumbers = dataB2B.map(item => item.contact_number).filter(Boolean);
                const b2cNumbers = dataB2C.map(item => item.contact_number).filter(Boolean);
    
                // Merge and remove duplicates
                const uniqueNumbers = [...new Set([...b2bNumbers, ...b2cNumbers])];
    
                setContacts(uniqueNumbers);
            } catch (err) {
                console.error("Failed to load contacts:", err);
            }
        };
        fetchContacts();
    }, []);

    const fetchConversation = async (number) => {
        try {
            const res = await fetch(`https://hogist.com/food-api/chatbot-conversation/?number=${encodeURIComponent(number)}`);
            const data = await res.json();
            const lines = data.chat_text.split("\n").filter(Boolean);
            const parsed = lines.map(line => {
                const [sender, ...rest] = line.split(":");
                return {
                    sender: sender.trim().toLowerCase(),
                    message: rest.join(":").trim()
                };
            });
            setMessages(parsed);
            setSelectedNumber(number);
        } catch (err) {
            console.error("Failed to fetch conversation:", err);
        }
    };

    return (
        <div className="flex w-full h-screen text-white p-5 bg-gray-900">
            {/* Left Panel - Contacts */}
            <div className="w-1/3 border-r border-gray-600 overflow-y-auto">
                <h2 className="text-lg font-semibold p-4 border-b border-gray-600">Chat Contacts</h2>
                {contacts.map((number) => (
                    <button
                        key={number}
                        onClick={() => fetchConversation(number)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                            selectedNumber === number ? 'bg-gray-700 font-bold' : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            {/* Right Panel - Messages */}
            <div className="w-2/3 px-6 overflow-y-auto text-white">
                <h2 className="text-lg font-semibold mb-4">Conversation with {selectedNumber}</h2>
                <div className="space-y-2">
                    {messages.length === 0 && <p>Select a contact to view the chat</p>}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                                    msg.sender === "user"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-gray-200 text-black rounded-bl-none"
                                }`}
                            >
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
