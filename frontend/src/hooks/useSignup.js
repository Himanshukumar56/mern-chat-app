import { useState } from "react"
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const signup = async() => {
        const success = handleInputErrors();
        if(!success) return;
        setLoading(true);
        try {
            
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
  
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords don't match");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must have mninimum length of 6");
        return false;
    }
    return true;
}
