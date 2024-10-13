import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { newPasswordValidation } from "../../utils/validation";
import { sendData } from "../../hooks/sendData";
import toast, { Toaster } from 'react-hot-toast';
import LefSide from "./components/LefSide";


function ResetPassword() {
  const { token } = useParams();
  const newPasswordRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Token validation and error toast if missing
  useEffect(() => {
    if (!token) {
      toast.error("Token is missing from the URL.");
    }
  }, [token]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  const clearForm = () => {
    passwordRef.current.value = '';
    newPasswordRef.current.value = '';
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const password = passwordRef.current.value;

    const { isValid, errors } = newPasswordValidation(password, newPassword);
    setErrors(errors);

    console.log(isValid, errors);
    if (!isValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendData(`http://localhost:3500/auth/reset-password/${token}`, {
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password reset successful! Redirecting...");
        clearForm();
        setTimeout(() => navigate("/login"), 2000); // Redirect after success
      } else {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      toast.error(error.response?.data || "Password reset failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
     
     <Toaster position="top-center" reverseOrder={false} />
      <LefSide/>

      {/* Password reset form */}
  
      <div className="lg:p-8 pt-10 md:pt-44 m-[30px] flex items-center justify-center">
    
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Change Password</h1>
            <p className="text-sm text-gray-600">Please enter your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`border p-3 rounded-md w-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Password"
                ref={passwordRef}
                required
              />
              <button type="button" className="absolute right-2 top-2" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className={`border p-3 rounded-md w-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-400 ${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
                placeholder="Confirm Password"
                ref={newPasswordRef}
                required
              />
              <button type="button" className="absolute right-2 top-2" onClick={toggleNewPasswordVisibility}>
                {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
              { errors.newPassword? null  :errors.newPasswordMatch&& <p className="text-red-500 text-sm">{errors.newPasswordMatch}</p>
}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 disabled:opacity-50" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
