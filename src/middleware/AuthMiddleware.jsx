import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";

const AuthMiddleware = ({ children }) => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        console.log('You are in AuthMiddleware');
        console.log(authState.isAuthenticated);
        if (!authState.isAuthenticated) {
            console.log("User is not authenticated");
            navigate("/login");
        }
    }, [authState.isAuthenticated, navigate]);

    console.log('You are in AuthMiddleware cccc');
    return children;
};

export default AuthMiddleware;