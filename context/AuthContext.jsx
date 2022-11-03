
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase";
import axios from "axios";
import { baseUrl } from "../components/data";
import { useState } from "react";
import { useRouter } from "next/router";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({});
    const [user, setUser] = useState(null);
    const [buyer, setBuyer] = useState();
    const router = useRouter()


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
                axios.get(`${baseUrl}/pedi?email=${user.email}`).then((res) => {
                    setUser(res.data)
                }).catch((err) => {
                    console.log(err)
                })
                axios.get(`${baseUrl}/buyer?email=${user.email}`).then((res) => {
                    setBuyer(res.data)
                }).catch((err) => {
                    console.log(err)
                })


            } else {
                setAdmin(null);
            }
        });
        setLoading(false);
        return () => {
            unsub()
        }
    }, [])

    const logout = async () => {
        setAdmin(null);
        await signOut(auth).then(() => {
            router.push('/')
        })
    }
    return (
        <AuthContext.Provider value={{ logout, admin, user, buyer }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);