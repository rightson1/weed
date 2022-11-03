import React from "react";
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineShoppingCart, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "./data";
import { useAuth } from "../context/AuthContext"

const Bottom = ({ admin }) => {
    const router = useRouter();
    const { buyer } = useAuth()

    if (admin) {
        return (
            <div className="w-full h-screen">
                {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile--> */}



                <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi')}>
                            <AiOutlineHome className="mx-auto text-2xl" />
                            <span className="tab tab-home block text-xs">Home</span>
                        </div>
                        <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi/add')}>

                            <AiOutlineAppstoreAdd className="mx-auto text-2xl " />
                            <span className="tab tab-kategori block text-xs">Add</span>
                        </div>
                        <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/pedi/products')}>

                            <AiOutlineShoppingCart className="mx-auto text-2xl " />
                            <span className="tab tab-explore block text-xs">Your Products</span>
                        </div>

                    </div>
                </section>
            </div>
        )

    }


    return (
        <div className="w-full h-screen">
            {/* <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile--> */}



            <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <div id="tabs" className="flex justify-between">
                    <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => router.push('/shop')}>
                        <AiOutlineHome className="mx-auto text-2xl" />
                        <span className="tab tab-home block text-xs">Home</span>
                    </div>
                    <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => {
                        if (!buyer) {
                            toast.error('You are not logged in', toastOptions)
                            return
                        }
                        else {
                            router.push('/shop/orders')
                        }
                    }}>

                        <AiOutlineAppstoreAdd className="mx-auto text-2xl " />
                        <span className="tab tab-kategori block text-xs">Orders</span>
                    </div>
                    <div href="#" className="w-full text-green focus:text-black hover:text-black justify-center inline-block text-center pt-2 pb-1 cursor-pointer" onClick={() => {
                        if (!buyer) {
                            toast.error('You are not logged in', toastOptions)
                            return
                        }
                        else {
                            router.push('/shop/dealers')
                        }
                    }}>

                        <AiOutlineShoppingCart className="mx-auto text-2xl " />
                        <span className="tab tab-explore block text-xs">Your Dealers</span>
                    </div>


                </div>
            </section>
            <ToastContainer />
        </div>
    )

};

export default Bottom;
