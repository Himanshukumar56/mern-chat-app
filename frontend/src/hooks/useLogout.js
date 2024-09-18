import { useState } from "react"

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const logout = async() => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout",{
                method : "POST",
                headers : {"Content-Type" : "application/json"}
            });
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }
}

export default useLogout
