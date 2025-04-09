import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "hogist" && password === "123456") {
            setIsAuthenticated(true);
            navigate("/dashboard");
        } else {
            setError("Invalid credentials! Try again.");
        }
    };

    return (
        <>
            <div className="relative h-screen flex items-center justify-center  bg-black">
                {/* Glowing Green Circle Effect */}
                <div className="absolute w-[300px] h-[300px] bg-green-600 rounded-full blur-3xl opacity-50 "></div>

                <div className="relative z-10 w-full">
{/* 
                    <h2 className="text-lg font-semibold text-white text-left px-6 md:px-10 py-10 md:py-2">Hogist</h2> */}
                    <div className="flex items-center justify-center">
                        {/* form */}
                        <div className="w-1/2 flex flex-col justify-center items-center p-10">
                            <div className=" p-8 rounded-xl w-80 md:w-96 text-white">

                                <p className="mb-4 text-gray-300">Please Enter the details</p>
                                {error && <p className="text-red-500 mb-3">{error}</p>}
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="email" className="">User Id</label>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="w-full p-3 mb-4 bg-white rounded-xl text-black outline-none"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full p-3 mb-4 bg-white rounded-xl text-black outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {/* <p className="text-right text-sm text-gray-400 cursor-pointer hover:underline">Forgot Password</p> */}
                                <button
                                    onClick={handleLogin}
                                    className="w-full mt-4 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700"
                                >
                                    Sign in
                                </button>

                            </div>
                        </div>

                        <div className="hidden lg:block relative md:w-1/2 ">

                            {/* Inverted Corner (Top Right) */}
                            <div className="absolute top-10 right-10 xl:right-28 w-20 h-20 bg-black rounded-bl-3xl z-0  border-2 border-black tag" ></div>
                            <div className="absolute top-14 left-10 lg:left-28  mx-8" >
                                <img src="src/assets/logo.webp" alt="img" className="w-36"/>
                            </div>

                            <div className="bg-green-700 text-white flex flex-col justify-center px-8 pt-16 pb-10 md:mx-10 xl:mx-28 mt-10 rounded-xl overflow-hidden border-2 border-green-700">


                                <div className="mt-10 py-6 bg-green-600 rounded-lg relative z-10 px-10 m">
                                    <div className="flex my-4 items-center justify-center">
                                        <h2 className="text-3xl font-bold z-10  ibm ">Welcome Back to <span className=" font-bold text-6xl leading-20 poppins  ">Sellient</span></h2>
                                        <img src="src/assets/robot.png" alt="" className="w-28 h-28   " />
                                        {/* <div className=" flex items-center justify-center">
                                      
                                    </div> */}
                                    </div>
                                    <blockquote className=" text-white my-6 font-semibold ">-Your Al-powered command center for smarter sales, sharper pitches, and seamless lead engagement. </blockquote>
                                    <div className="my-6 bg-white text-black py-3 rounded-full flex  justify-center items-center  shadow-2xl">
                                        <h3 className="font-normal italic text-lg  ">"Your Al Sales Sidekick is Ready to Roll !"</h3>
                                    </div>
                                    <p className=" text-black mt-6 font-semibold ">Powered by Hogist Technologies - Redefining bulk food delivery through Al.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
};
