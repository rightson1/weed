import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Nav from "../../components/Nav";
import { useAuth } from "../../context/AuthContext";
import { cards, baseUrl, toastOptions, } from "../../components/data";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { motion } from 'framer-motion'
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";


import Loading from "../../components/Loading";
const Add = () => {
    const { buyer } = useAuth();
    const [user, setUser] = React.useState();
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    useEffect(() => {

        axios.get(`${baseUrl}/buyer?email=${buyer?.email}`).then((res) => {
            setLoading(false)
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })


    }, [buyer])


    return <div className=" h-auto w-screen bg-white ">
        <Nav add={true} />
        <div className="text-black mt-10 ">

            <div className="flex flex-col px-8 tl:p-4">
                <div className="relative">
                    <img src="/kindu.png" alt="" className="tx:h-[200px]   w-full " />
                    <div className="absolute -bottom-10 left-4">
                        <img src="/stoner2.png" alt="" className="h-[100px] w-[100px] rounded-[50%] bg-black border-green" />
                    </div>
                </div>
                <div className="flex flex-col mt-[70px] ">
                    <h1 className="text-2xl font-bold">{buyer?.username}</h1>
                    <h1 className="text-[15px] font-light">@{buyer?.name}</h1>

                </div>
                <h1 className="text-xl  mt-5 text-center text-green  font-bold underline">Your Peadlers</h1>

                <div className=" p-4 flex flex-col gap-5 mt-[40px] bg-white justify-center items-center w-full ">


                    {user?.dealers.length ?
                        user?.dealers.map((dealer) => {
                            return <div className="flex gap-2 border-green border-[2px]  p-2 my-2 max-w-[500px] w-full shadow-lg justify-between" key={dealer}>
                                <div className="">
                                    <img src="/stoner2.png" alt="" className="h-[50px] w-[50px] rounded-[50%] shadow-lg p-2" />
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className="text-xl font-bold text-black">Dealer</h1>

                                    <h1>{dealer}</h1>
                                </div>
                                <button className="p-2 bg-[fuchsia] text-white  rounded-lg" onClick={() => router.push(`/shop/dealer/${dealer}`)}>Dealer Products</button>



                            </div>
                        }) : loading ? <Loading data="Loading..." /> : <Loading data="You dont have any dealers" />

                    }



                </div>;



            </div>

        </div>

        <Bottom shop={true} />

        <ToastContainer />
    </div>;
};

export default Add;
