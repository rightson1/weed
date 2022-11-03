import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Protected = ({ children }) => {
    const { admin } = useAuth();
    const router = useRouter();
    // useEffect(() => {
    //     if (!admin) {
    //         router.push('/login')
    //         return;
    //     }
    // }, [admin, router.push])

    return <>
        {/* {admin ? children : null} */}
        {children}
    </>
};

export default Protected;