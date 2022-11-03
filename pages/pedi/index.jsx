import React, { useEffect } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { cards } from "../../components/data";
import { Router, useRouter } from "next/router";


const Index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, admin } = useAuth();


    const router = useRouter();
    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin])
    return <div className=" h-screen w-screen">
        <Navbar />
        <div className="text-black mt-10">

            <div className="flex flex-col px-8 tl:p-4">
                <h1 className="text-3xl font-bold  text-green" >Welcome To The Pedi&apos;s Dashboard</h1>
                <div className="tl:grid tl:grid-rows-2 flex flex-wrap justify-center  mt-10 gap-4  tl:justify-center">
                    {
                        cards?.map((card, index) => {
                            return (
                                <div className="flex w-full h-[250px] flex-col justify-center items-center border border-black md:w-[250px] md:h-[300px]  shadow-lg hover:border-[orange] tl:overflow-hidden cursor-pointer" key={index} onClick={() => router.push(card.link)}>
                                    <img src={card.img} alt="" className="overflow-hidden" />
                                    <span className="font-bold text-xl">{card.title}</span>
                                    <span className="text-[10px] ">{card.desc}</span>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>

        <Bottom admin={true} />


    </div>;
};

export default Index;
