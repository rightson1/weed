import React, { useEffect, useState } from "react";
import { FcSearch, FcLike, FcRating } from "react-icons/fc";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import Bottom from "../../components/Bottom";
import { baseUrl, toastOptions } from "../../components/data";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import { motion } from "framer-motion"
import { MdOutlineExpandMore } from "react-icons/md";
import Loading from "../../components/Loading";
import { format } from "timeago.js"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
const Index = () => {
    const { buyer } = useAuth();
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const router = useRouter();
    useEffect(() => {

        axios.get(`${baseUrl}/order?buyer=${buyer?.name}`).then((res) => {
            setLoading(false)
            setOrders(res.data)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })


    }, [buyer, change])
    const handleDelete = () => {

        setLoading1(true)
        axios.delete(`${baseUrl}/order?_id=${deleteId}`).then((res) => {
            toast.success("Order Deleted Sucessfull", toastOptions)
            setLoading1(false)
            setCheck(false)
            setChange(!change)
        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
            setLoading1(false)
        })


    }
    console.log(deleteId)
    return <div className="bg-white first-line:">
        <Nav />

        <div className="text-black mt-10 bg-white h-auto">

            <div className="flex flex-col px-8 tl:p-4">
                <h1 className="text-3xl font-bold  text-green" >Orders</h1>
                <div className="overflow-x-auto w-full">
                    {
                        orders.length ? <div className="my-8 justify-center w-full overflow-auto max-h-[300px] pb-8">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" readOnly />
                                            </label>
                                        </th>
                                        <th>Image</th>
                                        <th>Dealer</th>
                                        <th>Quantity</th>
                                        <th>Delivered</th>
                                        <th >{check ? <button onClick={handleDelete} className="bg-red-900 p-2 text-white rounded-lg">{loading1 ? 'Deleting...' : "Delete"}</button> : "Select TO Delete"}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, i) => {

                                        return <tr key={i} className="my-2 px-8 border-black border-b" >
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox border-[1px] border-black" checked={check} onChange={(e) => {
                                                        setCheck(e.target.checked)
                                                        setDeleteId(order._id)

                                                    }} />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="https://firebasestorage.googleapis.com/v0/b/weed-e4552.appspot.com/o/product%2Fkindu2.png-145?alt=media&token=e1612083-5a2d-4b5e-abfc-14362ae84063" alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className="">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{order.dealer}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{order.quantity}</span>
                                                </div>
                                            </td>


                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{order.delivered.toString()}</span>
                                                </div>
                                            </td>


                                            <td className="py-4" onClick={() => {
                                                // handleDelete(item._id, item.pic)
                                                // setDeletingId(item._id)
                                            }}>
                                                <div className="w-full flex justify-start text-xl">
                                                    {/* <span className="bg-[red] p-2 rounded-md text-white text-[15px] cursor-pointer" >{deleting && deletingId === item._id ? "Deliting.." : "DELETE"}</span> */}
                                                </div>
                                            </td>

                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        </div> : !loading ?



                            <Loading data="No products added yet" />


                            :

                            <Loading data='loading...' />



                    }

                </div>

            </div>

        </div>
        <ToastContainer />

        <Bottom shop={true} />
        {/* </div>; */}
    </div>
};

export default Index;
