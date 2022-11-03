import React, { useEffect, useState } from "react";
import { FcRating } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Bottom from "../../../components/Bottom";
import { useRouter } from "next/router";
import { baseUrl, toastOptions } from "../../../components/data";
import Navbar from "../../../components/Navbar";
import { motion } from "framer-motion"

import Loading from "../../../components/Loading";
import axios from "axios"
import { useAuth } from "../../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
const Index = () => {
    const { user } = useAuth();
    const [product, setProduct] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);


    const [review, setReview] = React.useState("");
    const [change, setChange] = React.useState(false);
    const [change1, setChange1] = React.useState(false);
    const [loading1, setLoading1] = React.useState(false)
    const [loading2, setLoading2] = React.useState(false)
    const [buyer, setBuyer] = React.useState("");
    const [loading3, setLoading3] = React.useState(false);
    const [loading4, setLoading4] = React.useState(false);

    const router = useRouter()

    const [reviews, setReviews] = React.useState([]);
    const { id } = router.query

    useEffect(() => {

        axios.get(`${baseUrl}/order?id=${id}`).then((res) => {
            setOrder(res.data)

        }).catch((err) => {
            console.log(err)

        })


    }, [id, change1])
    useEffect(() => {

        axios.get(`${baseUrl}/product?_id=${order?.productId}`).then((res) => {
            setProduct(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })


    }, [order])
    useEffect(() => {

        axios.get(`${baseUrl}/buyer?name=${order?.buyer}`).then((res) => {
            setBuyer(res.data)
            setLoading2(false)

        }).catch((err) => {
            setLoading2(false)

            console.log(err)
        })


    }, [order])


    useEffect(() => {
        axios.get(`${baseUrl}/review?name=${order?.buyer}`).then((res) => {


            setReviews(res.data)

        }).catch((err) => {

            console.log(err)
        })

    }, [change, product])

    const handleReview = () => {

        if (!review) {
            toast.error("Please write a review")

        } else {
            setLoading3(true)
            axios.post(`${baseUrl}/review`, { text: review, sender: user?.name, receiver: order?.buyer }).then((res) => {
                toast.success("Review added")
                setReview("")
                setLoading3(false)
                setChange(!change)
            }).catch((err) => {
                toast.error("Something went wrong")
                setLoading3(false)
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading1(true)
        const phone = e.target.phone.value
        const text = e.target.text.value
        const data = { phone, text, receiver: order?.buyer, sender: user?.name, image: order?.image, orderId: order?._id }


        axios.post(`${baseUrl}/notifications`, data).then((res) => {
            axios.put(`${baseUrl}/order?_id=${id}`, { accepted: true }).then((res) => {
                setLoading1(false)
                e.target.reset()
                toast.success("Order Accepted")
                setOpen5(false);
                setChange1(!change1)

            }).catch((err) => {
                toast.error("Something went wrong")
                setLoading1(false)

            })


        }).catch((err) => {
            toast.error("Something went wrong")
            setLoading1(false)
        })
    }

    const handleDelivered = () => {
        setLoading4(true)
        axios.put(`${baseUrl}/order?_id=${id}`, { delivered: true }).then((res) => {

            axios.put(`${baseUrl}/product?_id=${product._id}`, { quantity: product?.quantity - 1 }).then((res) => {
                setLoading4(false)
                toast.success("Order Delivered")
                setChange1(!change1)

            }).catch((err) => {
                toast.error("Something went wrong")
                setLoading4(false)

            })

        }).catch((err) => {
            toast.error("Something went wrong")
            setLoading4(false)

        })
    }
    return <>
        <Navbar />
        <div className=" p-4 flex flex-col gap-5 md:mr-4 mt-[40px] bg-white">



            <div className="flex flex-wrap w-full  gap-4 justify-center">
                {
                    product ?

                        <div className=" flex  gap-2 w-full md:w-[45%]  h-auto flex-col py-4  shadow-lg    rounded-lg   max-w-[350px] ">
                            <div className=" h-full  overflow-hidden p-4 flex-1  " >
                                <img src={product.image} alt="" className=" h-[90%] object-contain " />
                            </div>
                            <div className="flex flex-col  px-4 flex-2  gap-2">
                                <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.name}</span> </div>
                                <div className="flex w-full justify-between  items-center"><span className="font-bold text-[15px]"> {product.offerTitle}</span> </div>



                                <h1 className="text-[12px] font-thin py-2">Order by {order?.buyer}</h1>
                                <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span><span className="font-thin text-[14px] line-through">KSH {parseInt(product.price) + parseInt(product.discount)}</span>

                                </div>

                                <div className="flex gap-1 flex-wrap">
                                    {order && !(order.accepted) ? <button className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                        onClick={() => setOpen5(true)}
                                    >Accept Order</button> : <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                    > Already Accepted</div>

                                    }
                                    <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer" onClick={() => setOpen1(true)}>Customer Details</div>
                                    <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer">{
                                        loading4 ? <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                        > Loading...</div> :

                                            order && !(order.delivered) ? <button className="w-full  gap-4 items-center bg-green  rounded-md text-white text-center cursor-pointer"
                                                onClick={handleDelivered}
                                            >Set Delivered To True</button> : <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"

                                            > Already Delivered</div>


                                    }</div>


                                </div>

                            </div>

                        </div>
                        :
                        !loading ? <Loading data="Product Not Found" /> :
                            <Loading data="Loading..." />




                }


            </div>

            <motion.div
                initial={{ x: '-200%' }}
                animate={
                    {
                        x: open5 ? 0 : '-200%',
                        transition: {
                            duration: 0.5


                        },
                    }
                }
                className="fixed  top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto bg-[rgba(0,0,0,.9)] items-center">

                <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full">
                    <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                        setOpen5(false)

                    }} />

                    <h1 className="text-2xl font-semibold text-center">Accept Order</h1>

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input type="phone" placeholder="Enter Your Phone number(optional)" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="phone" />
                        <textarea type="text" placeholder="Leave a message for Customer" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="text" />

                        <button className="text-bold p-2 bg-black text-white w-full" type="submit"> {loading1 ? "Loading...." : "Submit"}</button>
                    </form>

                </div>
            </motion.div>



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

                    <h1 className="text-2xl font-semibold text-center">Customer Details</h1>
                    <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
                        {
                            buyer ? <div className=" justify-center w-full overflow-auto  pb-8">

                                <div className="flex flex-col">
                                    <motion.div



                                        className="relative">
                                        <img src="/kindu.png" alt="" className="tx:h-[100px]   w-full " />
                                        <div className="absolute -bottom-10 left-0">
                                            <img src="/stoner2.png" alt="" className="h-[100px] w-[100px] rounded-[50%] shadow-lg p-2" />
                                        </div>
                                    </motion.div>
                                    <div className="flex flex-col mt-[50px] ">

                                        <div className="flex gap-1">   <span className="font-bold text-xl">Name</span>:   <h1 className="text-xl font-light text-[fuchsia]">{buyer?.name}</h1></div>

                                        <div className="flex gap-1 items-center">   <span className="font-bold text-xl">Client</span>:{(
                                            buyer?.dealers?.includes(order?.dealer) ? <button className="  text-[fuchsia]" >Your Client</button> : <button

                                                className=" text-[fuchsia]"
                                            >Not Your Client</button>)
                                        }
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-center text-green text-2xl py-1 font-bold underline">Details</h1>


                                        <div className="flex flex-col gap-2">
                                            <button className="text-bold p-2 bg-green text-white w-[100px ]" onClick={() => setOpen2(!open2)}>{open2 ? 'Close Form ' : "Add Review"}</button>

                                            <motion.div
                                                initial={
                                                    {

                                                    }
                                                }
                                                animate={{
                                                    x: open2 ? 0 : "-200vh", scaleY: open2 ? 1 : 0,
                                                    display: open2 ? "block" : "none",
                                                }}

                                                className="flex gap-4">
                                                <textarea type="text" placeholder="Add code" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="email" value={review} onChange={(e) => setReview(e.target.value)} />

                                                <button className="text-bold p-2 bg-black text-white w-full" onClick={handleReview}>{loading3 ? "Loading...." : "Add Review"}</button>
                                            </motion.div>
                                        </div>


                                        <div className="flex flex-col gap-2">
                                            <button className="text-bold p-2 bg-green text-white w-[100px ]" onClick={() => setOpen(!open)}>{open ? 'Close Reviews ' : "View Reviews"}</button>

                                            <motion.div
                                                initial={
                                                    {

                                                    }
                                                }
                                                animate={{
                                                    x: open ? 0 : "-200vh", scaleY: open ? 1 : 0,
                                                    display: open ? "block" : "none",
                                                }}

                                                className="flex flex-col gap-4 p-4 border-black border-[2px]  max-h-[200px] overflow-auto ">
                                                {
                                                    reviews?.map((item) => {
                                                        return <div className="flex gap-2 border-[fuchsia] border-[2px]  p-2 my-2" key={item._id}>
                                                            <div className="">
                                                                <img src="/stoner2.png" alt="" className="h-[50px] w-[50px] rounded-[50%] shadow-lg p-2" />
                                                            </div>
                                                            <div className="flex flex-col ">
                                                                <h1 className="text-xl font-bold text-black">{item.sender}</h1>

                                                                <h1>{item.text}</h1>
                                                            </div>


                                                        </div>
                                                    })

                                                }



                                            </motion.div>
                                        </div>
                                    </div>







                                </div>

                            </div> : !loading2 ?



                                <Loading data="No codes added yet" />


                                :

                                <Loading data='loading...' />



                        }

                    </div>

                </div>
            </motion.div>

            <Bottom admin={true} />
            <ToastContainer />
        </div>;
    </>
};

export default Index;
