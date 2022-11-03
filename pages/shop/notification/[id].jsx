import React, { useEffect, useState } from "react";
import { FcRating } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Bottom from "../../../components/Bottom";
import { useRouter } from "next/router";
import { baseUrl, toastOptions } from "../../../components/data";
import Nav from "../../../components/Nav";
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

    const [loading2, setLoading2] = React.useState(true);
    const [notification, setNotification] = React.useState();

    const [buyer, setBuyer] = React.useState("");
    const router = useRouter()

    const [reviews, setReviews] = React.useState([]);
    const { id } = router.query
    useEffect(() => {

        axios.get(`${baseUrl}/notifications?id=${id}`).then((res) => {


            setNotification(res.data)
        }).catch((err) => {
            console.log(err)


        })


    })
    console.log(notification)

    useEffect(() => {

        axios.get(`${baseUrl}/order?id=${notification?.orderId}`).then((res) => {
            setOrder(res.data)

        }).catch((err) => {
            console.log(err)

        })


    }, [notification])
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


    return <>
        <Nav />
        <div className=" p-4 flex flex-col gap-5 md:mr-4 mt-[40px] bg-white">



            <div className="flex flex-wrap w-full  gap-4 justify-center">
                {
                    product ?

                        <div className=" flex  gap-2 w-full md:w-[45%]  h-auto flex-col py-4  shadow-lg    rounded-lg   max-w-[350px] ">
                            <div className="  overflow-hidden p-4 flex-1   w-full flex justify-center" >
                                <img src={product.image} alt="" className=" h-[150px] object-contain " />
                            </div>
                            <div className="flex flex-col  px-4 flex-2  ">
                                <div className="flex w-full justify-between  items-center"><span className="font-bold text-[18px]"> <span>Product:</span> <span className="text-[15px] text-green">{product.name}</span></span> </div>
                                <div className="flex w-full justify-between  items-center"><span className="font-bold text-[18px]"> <span>Dealer:</span> <span className="text-[15px] text-green">{order?.dealer?.toUpperCase()}</span></span> </div>
                                <div className="flex w-full justify-between  items-center"><span className="font-bold text-[18px]"> <span>Phone:</span> <span className="text-[15px] text-green">{notification?.phone}</span></span> </div>
                                <div className="flex w-full justify-between  items-center"><span className="font-bold text-[18px]"> <span>Message:</span> <span className="text-[15px] text-green">{notification?.text}</span></span> </div>

                                <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span><span className="font-thin text-[14px] line-through">KSH {parseInt(product.price) + parseInt(product.discount)}</span>

                                </div>

                                <div className="flex gap-1 flex-wrap">



                                </div>

                            </div>

                        </div>
                        :
                        !loading ? <Loading data="Product Not Found" /> :
                            <Loading data="Loading..." />




                }


            </div>




            <Bottom shop={true} />
            <ToastContainer />
        </div>;
    </>
};

export default Index;
