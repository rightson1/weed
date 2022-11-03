import React from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import axios from "axios";
import { baseUrl, toastOptions } from "../components/data"
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const data = { email, username, password }


            axios.post(`${baseUrl}/pedi`, data).then((res) => {
                router.push('/login')
                setLoading(false)
            }).catch((err) => {
                console.log(err)

                toast.error("there was an error", toastOptions)

                setLoading(false)

            })

        } catch (err) {
            toast.error(err.message, toastOptions)

            setLoading(false)
        }

    }


    return <div className="overflow-x-hidden  flex flex-col" >
        <div className="item  w-full flex justify-center py-4">
            <img src="kindu.png" alt="" className="max-w-[200px] md:max-w-[300px]" />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-green text-center">PEDI REGISTERATION FORM</h1>
            <div className="flex flex-col  w-full justify-center items-center mt-7 px-8 gap-8">
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter name(do not use real name)" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="username" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2   outline-none" required name="email" />
                </div>
                <div className="flex flex-col text-green items-start w-1/2 tx:w-full tl:w-3/4">
                    <label htmlFor="">Enter Password</label>
                    <input type="Password" placeholder="Enter Password" className="py-4 placeholder:text-[10px] border-b border-green w-full  bg-[rgba(23,191,99,.1)] px-2  outline-none" required name="password" />
                </div>
                <button className="bg-green py-3 px-4 text-white rounded-md w-[180px] flex justify-center items-center gap-2" type="submit">{loading ? 'Please Wait....' : "Register"}</button>
                <p>Already have an account? <span className="text-green cursor-pointer" onClick={() => router.push("login")}>Login</span></p>

            </div>

        </form>
        <ToastContainer />

    </div>
}

export default Register;