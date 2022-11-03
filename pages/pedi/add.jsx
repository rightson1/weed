import React, { useEffect, useState } from "react";
import Bottom from "../../components/Bottom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { cards, baseUrl, toastOptions } from "../../components/data";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
const Add = () => {
    const [loading, setLoading] = useState();
    const [file, setFile] = useState(null);
    const router = useRouter()
    const { user, admin } = useAuth()

    useEffect(() => {
        if (!admin) {
            router.push('/login')
            return;
        }
    }, [admin, router.push])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const name = e.target.name.value;
        const price = e.target.price.value;
        const quantity = e.target.quantity.value;
        let search1 = e.target.search.value;
        let search = search1?.split(',')
        const data = { name, price, quantity, search, dealer: user.name };

        if (!file) {

            axios.post(`${baseUrl}/product`, data).then((res) => {
                setLoading(false)

                toast.success("Product added Sucessfull successfully", toastOptions);

                e.target.reset()

            }).catch((err) => {
                setLoading(false)
                toast.error(err.message, toastOptions);
            })

        }
        else {

            let name = `${file.name}-${Math.floor(Math.random() * 1000)}`;
            const fileRef = ref(storage, `/product/${name}`);
            uploadBytes(fileRef, file).then((res) => {
                getDownloadURL(res.ref).then((url) => {

                    const values = { ...data, image: url, pic: name }
                    axios.post(`${baseUrl}/product`, values).then((res) => {
                        setLoading(false)

                        toast.success("Product updated successfully", toastOptions);
                        e.target.reset()
                        toast.success("Product added Sucessfull", toastOptions);
                    }).catch((err) => {
                        setLoading(false)
                        toast.error(err.message, toastOptions);
                    })

                })

            }).catch((err) => {
                setLoading(false)
                console.log(err);
            });
        }



    }

    return <div className=" h-screen w-screen">
        <Navbar add={true} />
        <div className="text-black mt-10">

            <div className="flex flex-col px-8 tl:p-4">
                <h1 className="text-3xl font-bold  text-green" >Create New Product</h1>
                <form className="flex flex-col gap-8 items-center mt-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                        <label htmlFor="">Product Name</label>
                        <input type="text" placeholder="Enter Product Nsme" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="name" />
                    </div>
                    <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                        <label htmlFor="">Price Per Product</label>
                        <input type="number" placeholder="Enter Price" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="price" />
                    </div>
                    <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                        <label htmlFor="">Quantity of Products Available</label>
                        <input type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="quantity" />
                    </div>
                    <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                        <label htmlFor="">Search Items <span className="text-[13px] text-black">(search words people might use to search your product e.g ngwai, kindukulu)</span></label>
                        <div className="flex w-full">
                            <input type="text" placeholder="separate with commas" className="py-4 placeholder:text-[13px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none " required name="search" />


                        </div>                    </div>
                    <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                        <label htmlFor="image">Product Image</label>
                        <label type="number" placeholder="Enter Quantity" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none flex items-center justify-center" required name="price" htmlFor="image">
                            <BiImageAdd className="text-4xl" /> Pick IMage
                        </label>
                        <input type="file" id="image" className="hidden " name="image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                    </div>
                    <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2">{loading ? "Please Wait..." : "Add Product"} </button>
                </form>

            </div>

        </div>

        <Bottom admin={true} />

        <ToastContainer />
    </div>;
};

export default Add;
