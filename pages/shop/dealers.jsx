import React, { useEffect, useState } from "react";
import { FcSearch, FcLike, FcRating } from "react-icons/fc";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import Bottom from "../../components/Bottom";
import { baseUrl } from "../../components/data";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import { motion } from "framer-motion"
import { MdOutlineExpandMore } from "react-icons/md";
import Loading from "../../components/Loading";
import { format } from "timeago.js"
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
const Index = () => {
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
    return <>
        <Nav />
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


            <Bottom shop={true} />
        </div>;
    </>
};

export default Index;
