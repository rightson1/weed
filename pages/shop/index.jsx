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
const Index = () => {
    const [products, setProducts] = React.useState([]);
    const [offer, setOffer] = React.useState(false);
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loading1, setLoading1] = React.useState(true);
    const [loading2, setLoading2] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [found, setFound] = React.useState([]);
    const router = useRouter();
    useEffect(() => {

        axios.get(`${baseUrl}/product?all=${true}`).then((res) => {
            setProducts(res.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })


    }, [])
    useEffect(() => {
        axios.get(`${baseUrl}/product?offer=${true}`).then((res) => {
            setLoading1(false);
            setOffers(res.data)
        }).catch((err) => {
            console.log(err)
            setLoading1(false);
        })


    }, [])
    const handleSubmit = (e) => {
        setLoading2(true)
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(true);
        axios.get(`${baseUrl}/product?search=${search}`).then((res) => {
            setFound(res.data)
            setLoading2(false);
            e.target.reset()

        }).catch((err) => {
            console.log(err)
            setLoading2(false);
            setSearch(false);
        })
    }
    return <>
        <Nav />
        <div className=" p-4 flex flex-col gap-5 md:mr-4 mt-[40px] bg-white">

            <form className="flex  gap-2" onSubmit={handleSubmit} >
                <input type="text" placeholder="Look for product..." className="py-4  rounded-md border-[rgba(0,0,0,.7)] w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="search" />
                <button className="p-4 border-[rgba(0,0,0,.5)] border-[1px] rounded-md" type="submit"  >{!loading2 ? <FcSearch className="text-2xl" /> : <AiOutlineLoading3Quarters className="text-2xl" />}</button>
            </form>
            <div className="flex  gap-2 w-full justify-between ">
                <h1 className="font-bold text-2xl">Store</h1>
                <h1 className=" text-green text-normal font-semibold  flex gap-3"><span>New To Old</span> <span><MdOutlineExpandMore className="text-2xl" /></span>  </h1>
            </div>
            {search ? <div onClick={() => setSearch(false)}><AiOutlineClose className="text-2xl" /></div> : <div className="flex  justify-center w-full  gap-8 ">
                <motion.button

                    animate={{
                        border: !offer ? '2px solid rgba(255,100,255,1)' : ''
                    }}
                    className="flex items-center justify-center  border-black py-2  px-4 rounded-lg border-[1px]  h-[30px]" onClick={() => setOffer(false)} >All</motion.button>
                <motion.button


                    animate={{
                        border: offer ? '2px solid rgba(255,100,255,1)' : ''
                    }}
                    className="flex items-center justify-center  border-black py-2  px-4 rounded-lg border-[1px]  h-[30px]" onClick={() => setOffer(true)}>Offer</motion.button>



            </div>}
            <div className="flex flex-wrap w-full  gap-4 justify-center">
                {
                    search ? (
                        found.length ?
                            found.map((product, index) => {
                                return <div className=" flex  gap-2 w-full md:w-[45%]  h-[200px] bg-[rgba(23,191,99,.1)]    rounded-lg  md:max-w-[350px]  max-w-[430px] cursor-pointer" key={index} onClick={() => router.push(`/shop/item/${product._id}`)}>
                                    <div className=" h-full  overflow-hidden p-4 flex-1  " >
                                        <img src={product.image} alt="" className=" h-[90%] object-contain " />
                                    </div>
                                    <div className="flex flex-col  px-4 flex-2 ">
                                        <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.name}</span><span><FcLike className="text-xl" /></span> </div>
                                        <div className="flex w-full justify-between  items-center"><span className="font-bold text-[15px]">{product.quantity} items In Store</span> </div>

                                        {/* <div className="flex w-full justify-start gap-4 items-center"><span className="font-bold text-[18px]"><FcRating /></span><span>4.4</span> </div> */}
                                        {/* <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span><span className="bg-green py-3 rounded-lg px-4"><AiOutlineShoppingCart className="text-xl text-white" /></span> </div> */}
                                        <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span></div>
                                        <div className="flex gap-2 flex-wrap">     <h1 className="text-[12px] font-thin py-2">By {product.dealer}</h1>

                                            <h1 className="text-[12px] font-thin py-2">Posted {format(product.createdAt)}</h1></div>
                                        <button className="p-2 bg-green text-white rounded-md">Order Now</button>
                                    </div>


                                </div>
                            }) :
                            !loading2 ? <Loading data="No products Found" /> :
                                <Loading data="Loading..." />


                    ) : (
                        !offer ? (products.length ?
                            products.map((product, index) => {
                                return <div className=" flex  gap-2 w-full md:w-[45%]  h-[200px] bg-[rgba(23,191,99,.1)]    rounded-lg  md:max-w-[350px]  max-w-[430px] cursor-pointer" key={index} onClick={() => router.push(`/shop/item/${product._id}`)}>
                                    <div className=" h-full  overflow-hidden p-4 flex-1  " >
                                        <img src={product.image} alt="" className=" h-[90%] object-contain " />
                                    </div>
                                    <div className="flex flex-col  px-4 flex-2 ">
                                        <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.name}</span><span><FcLike className="text-xl" /></span> </div>
                                        <div className="flex w-full justify-between  items-center"><span className="font-bold text-[15px]">{product.quantity} items In Store</span> </div>

                                        {/* <div className="flex w-full justify-start gap-4 items-center"><span className="font-bold text-[18px]"><FcRating /></span><span>4.4</span> </div> */}
                                        {/* <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span><span className="bg-green py-3 rounded-lg px-4"><AiOutlineShoppingCart className="text-xl text-white" /></span> </div> */}
                                        <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span></div>
                                        <div className="flex gap-2 flex-wrap">     <h1 className="text-[12px] font-thin py-2">By {product.dealer}</h1>

                                            <h1 className="text-[12px] font-thin py-2">Posted {format(product.createdAt)}</h1></div>
                                        <button className="p-2 bg-green text-white rounded-md">Order Now</button>
                                    </div>


                                </div>
                            }) :
                            !loading ? <Loading data="No products added yet" /> :
                                <Loading data="Loading..." />


                        )
                            : (offers.length ? offers.map((product, index) => {
                                return <div className=" flex  gap-2 w-full md:w-[45%]  h-[250px] bg-[rgba(23,191,99,.1)]    rounded-lg   md:max-w-[350px]  max-w-[430px] cursor-pointer" key={index} onClick={() => router.push(`/shop/item/${product._id}`)}>
                                    <div className=" h-full  overflow-hidden p-4 flex-1  " >
                                        <img src={product.image} alt="" className=" h-[90%] object-contain " />
                                    </div>
                                    <div className="flex flex-col  px-4 flex-2 ">
                                        <div className="flex w-full justify-between pt-4 items-center"><span className="font-bold text-[18px]">{product.name}</span><span><FcLike className="text-xl" /></span> </div>
                                        <div className="flex w-full justify-between  items-center"><span className="font-bold text-[15px]"> {product.offerTitle}</span> </div>

                                        <div className="flex w-full  flex-col"><span className="font-bold text-[18px]">KSH {product.price}</span>
                                            <div className="flex"> <span className="font-thin text-[12px] line-through">KSH {parseInt(product.price) + parseInt(product.discount)}</span></div></div>
                                        <div className="flex w-full  gap-4 items-center justify-between ">
                                            <span>{product.quantity} in stock</span>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">     <h1 className="text-[12px] font-thin py-2">By {product.dealer}</h1>

                                            <h1 className="text-[12px] font-thin py-2">Posted {format(product.createdAt)}</h1></div>
                                        <button className="p-2 bg-green text-white rounded-md">Order Now</button>

                                    </div>

                                </div>
                            })
                                : !loading ? <Loading data="No products added yet" /> :
                                    <Loading data="Loading..." />

                            )
                    )

                }


            </div>
            <Bottom shop={true} />
        </div>;
    </>
};

export default Index;
