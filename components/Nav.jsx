import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineUser, AiOutlineLock } from "react-icons/ai"
import { MdOutlineLocalOffer, MdPeopleOutline, MdReport } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router"
import { BsArrowLeft } from "react-icons/bs"
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "./data";
import axios from "axios";
import { baseUrl } from "./data";

const Nav = ({ add }) => {
    const [open, setOpen] = useState(false);
    const { buyer, logout } = useAuth()
    const [notifications, setNotifications] = useState([])
    useEffect(() => {

        axios.get(`${baseUrl}/notifications?name=${buyer?.name}`).then((res) => {


            setNotifications(res.data)
        }).catch((err) => {
            console.log(err)


        })


    }, [buyer])
    const router = useRouter();
    return <div className="flex flex-col p-4 gap-4 ">
        <div className="flex w-full justify-between fixed top-0 left-0 p-4 h-[80px] z-20 bg-white">
            {!add ? <p className="text-green cursor-pointer">Dashboard</p> : <BsArrowLeft className="text-green text-3xl cursor-pointer" onClick={() => router.back()} />}
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
                            <span onClick={() => router.push('/shop')}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
                                <AiOutlineHome className="text-xl cursor-pointer" />
                                <span className="ml-3">Dashboard</span>
                                <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">3</span>
                            </span>
                        </li>



                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Account</span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => {
                                if (!buyer) {
                                    toast.error('You are not logged in', toastOptions)
                                    return
                                }
                                else {
                                    router.push('/shop/profile')
                                }
                            }}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <AiOutlineUser className="text-xl" />
                                <span className="ml-3">Profile</span>
                            </span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => {
                                if (!buyer) {
                                    toast.error('You are not logged in', toastOptions)
                                    return
                                }
                                else {
                                    router.push('/shop/dealers')
                                }
                            }}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <MdPeopleOutline className="text-xl" />
                                <span className="ml-3">Dealers</span>
                                <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{buyer?.dealers.length}</span>
                            </span>
                        </li>

                        <li className="my-px cursor-pointer">
                            <span onClick={() => {
                                if (!buyer) {
                                    toast.error('You are not logged in', toastOptions)
                                    return
                                }
                                else {
                                    router.push('/shop/notifications')
                                }
                            }}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <IoMdNotificationsOutline />
                                <span className="ml-3">Notifications</span>
                                <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{notifications.length}</span>
                            </span>
                        </li>
                        <li className="my-px cursor-pointer">
                            <span onClick={() => {
                                if (!buyer) {
                                    toast.error('You are not logged in', toastOptions)
                                    return
                                }
                                else {
                                    router.push('/shop/orders')
                                }
                            }}
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <MdReport className="text-xl" />
                                <span className="ml-3">Orders</span>

                            </span>
                        </li>


                        <li className="my-px">
                            {
                                buyer ? <span onClick={async () => {
                                    await logout()

                                }}
                                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
                                    <AiOutlineLock className="text-xl text-red-500" />
                                    <span className="ml-3">Logout</span>
                                </span> : <span
                                    className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/shop/login')}>
                                    <AiOutlineLock className="text-xl text-red-500 " />
                                    <span className="ml-3">Login</span>
                                </span>
                            }
                        </li>
                        <li className="my-px">
                            <span
                                className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/')}>
                                <AiOutlineLock className="text-xl text-red-500 " />
                                <span className="ml-3">Back To Landing Page</span>
                            </span>

                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </motion.div>

    </div>
};

export default Nav;
