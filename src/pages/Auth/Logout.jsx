import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/context";
import { getData } from "../../hooks/sendData";


function Logout() {
    const navigate=useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const handleLogout = async(e) => {
        e.preventDefault();
        try {
        await getData('/logout');
        localStorage.clear();    
        setAuthState({ isAuthenticated: false });
        navigate("/login");
        }
        catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }


    }
    return <button onClick={handleLogout}>Log out</button>;
}

export default Logout;