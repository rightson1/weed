import React from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase"

import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { ToastOptions } from "react-toastify";
import { toastOptions } from "../../components/data";
const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            router.push("/shop")

            setLoading(false)

        } catch (err) {
            toast.error(err.message, toastOptions)
            setLoading(false)
        }

    }
    return <div className="overflow-x-hidden  flex flex-col h-screen justify-center bg-white" >
        <div className="item  w-full flex justify-center py-4">
            <img src="kindu.png" alt="" className="max-w-[200px] md:max-w-[300px]" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-green text-center">PEDI LOGIN FORM</h1>
            <form className="flex flex-col  w-full justify-center items-center mt-7 px-8 gap-8" onSubmit={handleSubmit}>

                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="email" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Enter Password</label>
                    <input type="Password" placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="password" />
                </div>
                <button type="submit" className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2">{loading ? "Please Wait..." : "Login"} </button>
                <p>Dont have an account? <span className="text-green cursor-pointer" onClick={() => router.push("/shop/register")}>Register</span></p>
            </form>

        </div>
        <ToastContainer />

    </div>
};

export default Login;
