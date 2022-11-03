import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineUser } from "react-icons/ai"
import { MdOutlineLocalOffer, MdPeopleOutline, MdReport } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router"
import { BsArrowLeft } from "react-icons/bs"
import axios from "axios"
import { baseUrl } from "./data";
const Navbar = ({ add }) => {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth();
    const [clients, setClients] = useState([]);
    const [orders, setOrders] = useState([]);
    const router = useRouter();
    useEffect(() => {

        axios.get(`${baseUrl}/buyer?dealer=${user?.name}`).then(res => {

            setClients(res.data);
        }).catch(err => {
            console.log(err)
        })


    }, [user])
    useEffect(() => {

        axios.get(`${baseUrl}/order?dealer=${user?.name}`).then((res) => {

            setOrders(res.data)
        }).catch((err) => {
            console.log(err)

        })


    }, [user])

    return <div className="flex flex-col p-4 gap-4 ">
        <div className="flex w-full justify-between fixed top-0 left-0 p-4 h-[80px] z-20 bg-white">
            {!add ? <p className="text-green cursor-pointer">Dashboard</p> : <BsArrowLeft className="text-green text-3xl cursor-pointer" onClick={() => router.back()} />}

            <ul className="hidden md:flex">
                <li className="my-px cursor-pointer">
                    <span onClick={() => router.push('/pedi/profile')}
                        className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                        <AiOutlineUser className="text-xl" />
                        <span className="ml-3">Profile</span>
                    </span>
                </li>

                <li className="my-px cursor-pointer">
                    <span onClick={() => router.push('/pedi/orders')}
                        className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                        <MdPeopleOutline className="text-xl" />
                        <span className="ml-3">Orders</span>
                    </span>
                </li>
            </ul>
            <div className="flex flex-col gap-2 items-end  mr-4 tx:mr-0 cursor-pointer bg-white " onClick={() => setOpen(!open)}>
                <motion.div
                    animate={{
                        rotate: open ? -45 : 0,
                        y: open ? -5 : 0,
                        width: open ? "40px" : "40px",
                        transformOrigin: "right",
                    }}
                    className="w-[20px] h-[2px] bg-green" ></motion.div>
                <motion.div
                    animate={{
                        rotate: open ? 45 : 0,
                        y: open ? 5 : 0,

                        transformOrigin: "right",
                    }}

                    className="w-[40px] h-[2px] bg-green"></motion.div>
                <motion.div
                    animate={{
                        rotate: open ? 45 : 0,
                        x: open ? '100vw' : 0,

                        transformOrigin: "right",
                    }}

                    className="w-[40px] h-[2px] bg-green"></motion.div>
            </div>
        </div>
        <motion.div
            animate={{
                x: open ? 0 : '-200vw',

            }}
            initial={{
                x: '-200vw',
            }}

            className="fixed z-20 top-[80px] overflow-auto min-h-screen w-screen flex justify-start bg-[rgba(0,0,0,.8)] y-10"  >

            <div className="h-screen  bg-gray-100  overflow-y-scroll w-[300px] ">

                <div className="flex w-full max-w-xs p-4 bg-white">
                    <ul className="flex flex-col w-full">
                        <li className="my-px cursor-pointer">
                            <span onClick={() => router.push('/pedi')}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
                                <AiOutlineHome className="text-xl cursor-pointer" />
                                <span className="ml-3">Dashboard</span>

                            </span>
                        </li>



                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Account</span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => router.push('/pedi/profile')}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <AiOutlineUser className="text-xl" />
                                <span className="ml-3">Profile</span>
                            </span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => router.push('/pedi/orders')}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <MdPeopleOutline className="text-xl" />
                                <span className="ml-3">Clients</span>
                                <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{clients.length}</span>
                            </span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => router.push('/pedi/orders')}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <MdPeopleOutline className="text-xl" />
                                <span className="ml-3">Orders</span>
                                <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{orders.filter((order) => order.delivered === false).length}</span>
                            </span>
                        </li>




                        <li className="my-px cursor-pointer" onClick={async () => {
                            await logout()
                            router.push('/')
                        }}>
                            <span
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-red-400">
                                    <svg fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                                    </svg>
                                </span>
                                <span className="ml-3">Logout</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>

    </div>
};

export default Navbar;
