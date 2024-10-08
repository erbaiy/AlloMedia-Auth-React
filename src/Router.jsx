



import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import VerifyOtp from './pages/Auth/Verify-otp';
import ForgetPassword from "./pages/Auth/Forget-password";
import ResetPassword from "./pages/Auth/Reset-password";
import AuthMiddleware from "./middleware/AuthMiddleware";
import Home from './pages/Dashboard/Home';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={
          <AuthMiddleware>
            <Home />
          </AuthMiddleware>
        } />
        </Routes>
    );
};

export default AppRouter;

