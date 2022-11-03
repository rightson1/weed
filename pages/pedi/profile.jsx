import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase"
import { storage } from "../../firebase";
import { cards, baseUrl, toastOptions, } from "../../components/data";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { motion } from 'framer-motion'
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { updateEmail } from "firebase/auth";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
const Add = () => {

    const { user, admin } = useAuth();
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [current, setCurrent] = useState();
    const [loading, setLoading] = useState();
    const [loading1, setLoading1] = useState();
    const [change, setChange] = useState();
    const [loading2, setLoading2] = useState();
    const [loading3, setLoading3] = useState();
    const [code, setCode] = useState();
    const [security, setSecurity] = useState(true);
    const [open1, setOpen1] = useState(false);
    const router = useRouter()
    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin, router.push])
    useEffect(() => {
        setSecurity(user?.security)
    }, [user])
    const handleEnable = async (e) => {
        setLoading1(true)

        axios.put(`${baseUrl}/pedi?_id=${user._id}`, { security: !user?.security }).then((res) => {
            setLoading1(false)
            setSecurity(res.data.security)
            toast.success("Security Updated successfully", toastOptions);
        }).catch((err) => {
            setLoading1(false)
            toast.error("something went wrong", toastOptions);
        })
    }
    useEffect(() => {
        setLoading2(true)
        axios.get(`${baseUrl}/pedi?email=${user?.email}`).then((res) => {
            setCurrent(res.data)
            setLoading2(false)
        }).catch((err) => {
            console.log(err)
            setLoading2(false)
        })
    }, [change, user])

    const handleCode = async (e) => {
        setLoading(true)

        axios.put(`${baseUrl}/pedi?_id=${user._id}`, { code }).then((res) => {
            setLoading(false)
            setCode('')
            setChange(!change)

            toast.success("Security Added successfully", toastOptions);
        }).catch((err) => {
            setLoading(false)
            toast.error("something went wrong", toastOptions);
        })
    }
    const handleDelete = async (code) => {
        setLoading3(true)

        axios.put(`${baseUrl}/pedi?crud=${user._id}`, { code }).then((res) => {
            setLoading3(false)

            setChange(!change)

            toast.success("Code Deleted successfully", toastOptions);
        }).catch((err) => {
            setLoading3(false)
            toast.error("something went wrong", toastOptions);
        })
    }




    return <div className=" h-screen w-screen">
        <Navbar add={true} />
        <div className="text-black mt-10">

            <div className="flex flex-col px-8 tl:p-4">
                <div className="relative">
                    <img src="/kindu.png" alt="" className="tx:h-[200px]   w-full " />
                    <div className="absolute -bottom-10 left-4">
                        <img src="/stoner2.png" alt="" className="h-[100px] w-[100px] rounded-[50%] bg-black border-green" />
                    </div>
                </div>
                <div className="flex flex-col mt-[70px] ">
                    <h1 className="text-2xl font-bold">{user?.username}</h1>
                    <h1 className="text-[15px] font-light">@{user?.name}</h1>

                </div>


                <div className="flex justify-between flex-col py-4 gap-3">
                    <span className="text-2xl font-bold">Security</span>
                    <button className="w-full  bg-[green] p-4 text-white text-xl hover:bg-white hover:text-green border-[2px] border-green" onClick={() => setOpen(!open)}>View Security Details</button>
                    <motion.div
                        initial={
                            {

                            }
                        }
                        animate={{
                            x: open ? 0 : "-200vh", scaleY: open ? 1 : 0,
                            display: open ? "block" : "none",
                        }}
                        className="flex flex-col space-y-4">
                        <p>Enabling security feature will ensure only this who have your buying code can order, This will prevent
                            security personell from accessing yor details,give code name close to client name but not same so that you can know who is ordering,</p>
                        <div className="flex w-full gap-4 justify-center">

                            <button onClick={handleEnable} className="text-bold p-2 bg-green text-white w-[100px]">{loading1 ? 'Loading' : !security ? 'Enable' : 'Disable'}</button>
                            <button className="text-bold p-2 bg-green text-white w-[100px ]" onClick={() => setOpen1(true)}>View Codes</button>


                        </div>

                        <div className="flex gap-4">
                            <input type="text" placeholder="Add code" className="py-4  border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="email" value={code} onChange={(e) => setCode(e.target.value)} />

                            <button className="bg-green p-4 text-white" onClick={handleCode} >{loading ? 'Loading...' : "Add"} </button>
                        </div>
                    </motion.div>

                </div>
                <span className="text-2xl font-bold">Account</span>
                <div className="flex  gap-4">

                    <button className="w-full  bg-[green] p-4 text-white text-xl hover:bg-white hover:text-green border-[2px] border-green" onClick={() => setOpen(!open)}>Logout</button>
                    <button className="w-full  bg-[green] p-4 text-white text-xl hover:bg-white hover:text-green border-[2px] border-green" onClick={() => setOpen(!open)}>Delete Account</button>

                </div>


            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
        <motion.div
            initial={{ x: '-200%' }}
            animate={
                {
                    x: open1 ? 0 : '-200%',
                    transition: {
                        duration: 0.5


                    },
                }
            }
            className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto bg-[rgba(0,0,0,.9)]">
            <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  ">
                <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                    setOpen1(false)

                }} />

                <h1 className="text-2xl font-semibold text-center">View Codes</h1>
                <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
                    {
                        current?.code.length ? <div className="my-8 justify-center w-full overflow-auto max-h-[300px] pb-8">
                            <table className="border-[2px] border-white min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Code</th>

                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Delete Code</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {current.code.map((item, i) => {


                                        return <tr key={i} className="my-2 px-8 border-black" >

                                            <td className=" text-centers">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 " onClick={() => {
                                                handleDelete(item)
                                                setDeleteId(item)

                                            }}>
                                                <div className="w-full flex justify-start text-xl">
                                                    <span className="bg-[red] p-2 rounded-md text-white text-[15px]" >{loading3 && deleteId === item ? "Deliting.." : "DELETE"}</span>
                                                </div>
                                            </td>

                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div> : !loading2 ?



                            <Loading data="No codes added yet" />


                            :

                            <Loading data='loading...' />



                    }

                </div>

            </div>
        </motion.div>
    </div>;
};

export default Add;
