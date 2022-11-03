import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { cards, baseUrl, toastOptions } from "../../components/data";
import { Router, useRouter } from "next/router";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import Loading from "../../components/Loading";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

const Product = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, admin } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin, router.push])
    useEffect(() => {
        axios.get(`${baseUrl}/product`).then(res => {
            setProducts(res.data)
            setLoading(false)

        }).catch((e) => {
            console.log(e)
            setLoading(false)
        })

    }, [change])
    const handleDelete = async (id, pic) => {
        setDeleting(true)

        axios.delete(`${baseUrl}/product?_id=${id}`).then(async (res) => {

            const storageRef = ref(storage, `product/${pic}`);

            await deleteObject(storageRef).then(() => {

                setDeleting(false)

                toast.success("Product Deleted Successfully")
            }).catch((err) => {

                setDeleting(false);
            })
            setChange(!change)
        }).catch(e => {
            toast.error("Something went wrong", toastOptions);
            setDeleting(false);
        })

    }
    return <div className=" h-screen w-screen">
        <Navbar add={true} />
        <div className="text-black mt-10">

            <div className="flex flex-col px-8 tl:p-4">
                <h1 className="text-3xl font-bold  text-green" >Welcome To Your Store</h1>
                <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
                    {
                        products.length ? <div className="my-8 justify-center w-full overflow-auto max-h-[300px] pb-8">
                            <table className="border-[2px] border-white min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Pic</th>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Price</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Products In Store</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">On Offer</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Discount Offerd</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm min-w-[90px]">Delete Item</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, i) => {
                                        console.log(item.offer)

                                        return <tr key={i} className="my-2 px-8 border-black border-b" >
                                            <td className="py-4">
                                                <div className=" flex justify-center w-[50px] h-[50px]  rounded-[50%]">
                                                    <img src={item.image} alt="" className="w-[50px] h-[50px]  rounded-[50%] object-contain" />
                                                </div>

                                            </td>
                                            <td className="">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item.price}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item.quantity}</span>
                                                </div>
                                            </td>

                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item.offer.toString()}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full flex justify-start text-xl">
                                                    <span>{item.discount.toString()}</span>
                                                </div>
                                            </td>

                                            <td className="py-4" onClick={() => {
                                                handleDelete(item._id, item.pic)
                                                setDeletingId(item._id)
                                            }}>
                                                <div className="w-full flex justify-start text-xl">
                                                    <span className="bg-[red] p-2 rounded-md text-white text-[15px] cursor-pointer" >{deleting && deletingId === item._id ? "Deliting.." : "DELETE"}</span>
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
        <Bottom admin={true} />


    </div>;
};

export default Product;
