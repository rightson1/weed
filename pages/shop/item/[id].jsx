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
    const { buyer } = useAuth();
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [loading3, setLoading3] = React.useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);
    const [loading6, setLoading6] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [review, setReview] = React.useState("");
    const [change, setChange] = React.useState(false);
    const [change1, setChange1] = React.useState(false);
    const [code, setCode] = React.useState("");
    const router = useRouter()
    const [pedi, setPedi] = React.useState();
    const [reviews, setReviews] = React.useState([]);
    const { id } = router.query
    const [user, setUser] = React.useState([]);
    useEffect(() => {

        axios.get(`${baseUrl}/product?_id=${id}`).then((res) => {
            setProduct(res.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })


    }, [id])
    useEffect(() => {

        axios.get(`${baseUrl}/buyer?email=${buyer?.email}`).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })


    }, [change1, buyer])

    useEffect(() => {

        axios.get(`${baseUrl}/pedi?name=${product?.dealer}`).then((res) => {
            setPedi(res.data)
            setLoading2(false)

        }).catch((err) => {
            setLoading2(false)

            console.log(err)
        })


    }, [product])
    useEffect(() => {
        axios.get(`${baseUrl}/review?name=${product?.dealer}`).then((res) => {


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
            axios.post(`${baseUrl}/review`, { text: review, sender: buyer.name, receiver: product?.dealer }).then((res) => {
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

    const handleAdd = () => {
        setLoading4(true)
        axios.put(`${baseUrl}/buyer?_id=${buyer?._id}`, { dealer: product?.dealer, type: "add" }).then((res) => {
            toast.success("Sucessfull added new dealer", toastOptions)
            setLoading4(false)
            setChange1(!change1)
        }).catch((err) => {
            console.log(err)
            setLoading4(false)
        })

    }

    const handleRemove = () => {
        setLoading4(true)
        axios.put(`${baseUrl}/buyer?_id=${buyer?._id}`, { dealer: product?.dealer, type: "remove" }).then((res) => {
            toast.success("Sucessfull Removed dealer", toastOptions)
            setLoading4(false)
            setChange1(!change1)
        }).catch((err) => {
            console.log(err)
            setLoading4(false)
        })
    }
    const handleKey = () => {
        setLoading5(true)
        axios.get(`${baseUrl}/pedi?code=${code}&name=${product.dealer}`).then((res) => {

            toast.success("Correct key", toastOptions)
            setLoading5(false)
            setOpen5(true)
            setCode("")

        }).catch((err) => {

            setLoading5(false)
            toast.success("Wrong Dealer key, please make friends you will be given his key", toastOptions)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading6(true)
        const quantity = e.target.quantity.value
        const pickup = e.target.pickup.value
        const data = { quantity, pickup, image: product.image, dealer: product.dealer, product: product.name, productId: product._id, buyer: buyer?.name, buyerId: buyer?._id };

        axios.post(`${baseUrl}/order`, data).then((res) => {
            toast.success("Order placed", toastOptions)
            setLoading6(false)
            setOpen5(false)
            setOpen4(false)
            e.target.reset()
        }).catch((err) => {
            toast.error("Something went wrong", toastOptions)
            setLoading6(false)
        })


    }

    return <>
        <Nav />
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

                                <div className="flex w-full gap-4 items-center justify-between"><div className="flex items-center gap-4"><span className="font-bold text-[18px]"><FcRating /></span><span>4.4</span></div> <span>
                                    <div className="rating gap-1">
                                        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                                        <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />
                                        <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
                                        <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
                                        <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
                                    </div>
                                </span> </div>

                                <h1 className="text-[12px] font-thin py-2">By {product.dealer}</h1>
                                <div className="flex w-full  gap-4 items-center justify-between"><span className="font-bold text-[18px]">KSH {product.price}</span><span className="font-thin text-[14px] line-through">KSH {parseInt(product.price) + parseInt(product.discount)}</span>

                                </div>

                                <div className="flex gap-1 flex-row-reverse">
                                    <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer"
                                        onClick={() => {
                                            if (!buyer) {
                                                return toast.error("Please login to continue")
                                            }
                                            if (pedi?.security) {
                                                return setOpen4(true)
                                            } else {
                                                return setOpen5(true)
                                            }

                                        }}
                                    >Order</div>
                                    <div className="w-full  gap-4 items-center bg-green p-2 rounded-md text-white text-center cursor-pointer" onClick={() => {
                                        if (!buyer) {
                                            return toast.error("Please login to continue")
                                        }
                                        setOpen1(true)
                                    }}>Dealer Details</div>


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
                        x: open4 ? 0 : '-200%',
                        transition: {
                            duration: 0.5


                        },
                    }
                }
                className="fixed items-start top-0 left-0  h-full px-4 py-  w-full z-20  flex  justify-center pt-8 overflow-y-auto bg-[rgba(0,0,0,.9)] items-center">

                <div className="flex flex-col gap-4 p-4 shadow-lg bg-white  relative  w-full">
                    <AiOutlineCloseCircle className="text-4xl text-[#ab4bab] absolute -top-4 -right-3 cursor-pointer" onClick={() => {
                        setOpen4(false)

                    }} />

                    <h1 className="text-2xl font-semibold text-center">Dealer Key</h1>

                    <div className="flex flex-col gap-2">
                        <input type="text" placeholder="Enter Dealer Key" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="email" value={code} onChange={(e) => setCode(e.target.value)} />

                        <button className="text-bold p-2 bg-black text-white w-full" onClick={handleKey}>{loading5 ? "Loading...." : "Submit"}</button>
                    </div>

                </div>
            </motion.div>
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

                    <h1 className="text-2xl font-semibold text-center">Make Order</h1>

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input type="number" placeholder="Enter Quantity" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="quantity" />
                        <textarea type="text" placeholder="Enter Prefered pickup point" className="py-4  border-b border-green w-full  bg-[rgba(0,0,0,.1)] px-2   outline-none" required name="pickup" />

                        <button className="text-bold p-2 bg-black text-white w-full" type="submit"> {loading6 ? "Loading...." : "Submit"}</button>
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

                    <h1 className="text-2xl font-semibold text-center">Pedi Details</h1>
                    <div className="p-4 flex flex-wrap gap-4 justify-center items-center">
                        {
                            pedi ? <div className=" justify-center w-full overflow-auto  pb-8">

                                <div className="flex flex-col">
                                    <motion.div



                                        className="relative">
                                        <img src="/kindu.png" alt="" className="tx:h-[100px]   w-full " />
                                        <div className="absolute -bottom-10 left-0">
                                            <img src="/stoner2.png" alt="" className="h-[100px] w-[100px] rounded-[50%] shadow-lg p-2" />
                                        </div>
                                    </motion.div>
                                    <div className="flex flex-col mt-[50px] ">

                                        <div className="flex gap-1">   <span className="font-bold text-xl">Name</span>:   <h1 className="text-xl font-light text-[fuchsia]">@{pedi?.name}</h1></div>
                                        <div className="flex gap-1 items-center">   <span className="font-bold text-xl">Dealer</span>:{loading4 ? (<span className="text-green">Loading</span>) : (
                                            user?.dealers?.includes(product?.dealer) ? <button onClick={handleRemove} className="text-white p-1  bg-[fuchsia]" >Remove From Dealer List</button> : <button
                                                onClick={handleAdd}
                                                className="text-white p-1  bg-[fuchsia]"
                                            >Become A Client</button>)
                                        }
                                        </div>

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-center text-green text-2xl py-1 font-bold underline">Details</h1>

                                        <div className="flex justify-between flex-col ">
                                            <button className="text-bold p-2 bg-green text-white w-[100px ]" onClick={() => setOpen3(!open3)}>{open3 ? 'Close Security Details ' : "View Security Details"}</button>


                                            <motion.div
                                                initial={
                                                    {

                                                    }
                                                }
                                                animate={{
                                                    x: open3 ? 0 : "-200vh", scaleY: open3 ? 1 : 0,
                                                    display: open3 ? "block" : "none",
                                                }}

                                                className="flex gap-4">
                                                <div className="flex gap-1">   <span className="font-bold text-xl">Security</span>:   <h1 className="text-xl  text-green">{pedi?.security == true ? 'True' : "False"}</h1></div>



                                                <p className="text-[13px]">If security is True then you cannot order from this dealer unless you know his key</p>

                                            </motion.div>




                                        </div>


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

            <Bottom shop={true} />
            <ToastContainer />
        </div>;
    </>
};

export default Index;
