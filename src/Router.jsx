import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route only
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import VerifyOtp from './pages/Auth/Verify-otp';
import ForgetPassword from "./pages/Auth/Forget-password";
import ResetPassword from "./pages/Auth/Reset-password";
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            </Routes>

    );
}

export default AppRouter;
