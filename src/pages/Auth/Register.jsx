
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { validateRegister } from "../../utils/validation";
import PopUpSuccess from './components/PopUpSeccess';
import PopUpFailed from './components/PopUpFailed';
import { sendData } from "../../hooks/sendData";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [backendError, setBackendError] = useState("");

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  // user navigate to login page
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const clearForm = () => {
    [usernameRef, emailRef, passwordRef, roleRef].forEach(ref => ref.current.value = '');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      roles: [roleRef.current.value]
    };

    const { isValid, errors: validationErrors } = validateRegister(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendData("http://localhost:3500/register", formData);
      if (response.status === 201) {
        clearForm();
        setShowSuccessPopup(true);
       
        
      } else {
        setBackendError("Unexpected error occurred.");
        setShowFailedPopup(true);
      }
    } catch (error) {
      // Handle error from the backend
      if (error.response?.status === 400) {
        // Check if it's a 'Username or email already exists' error
        if (error.response.data?.error === 'Username or email already exists') {
          setBackendError('Username or email already exists. Please choose another.');
        } else {
          // Set any other backend error message
          setBackendError(error.response?.data?.message || 'Something went wrong.');
        }
      } else {
        setBackendError('Something went wrong.');
      }
      setShowFailedPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="text-4xl font-bold">
            All<span className="text-blue-700">o</span>Media
          </h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;M3a AloMedia Hna kan 3ndk kl 7aga&rdquo;</p>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-muted-foreground">Enter your email & password</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className={`border p-2 rounded-md ${errors.username ? "border-red-500" : ""}`}
                placeholder="Username"
                ref={usernameRef}
                required
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}

              <input
                type="email"
                className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                ref={emailRef}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <button type="button" className="absolute right-2 top-2" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}

              <select
                className={`border border-gray-300 p-2 rounded-md w-full ${errors.roles ? "border-red-500" : ""}`}
                ref={roleRef}
                required
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Client">Client</option>
                <option value="Livreur">Livreur</option>
              </select>
              {errors.roles && <p className="text-red-500">{errors.roles}</p>}
            </div>

            {errors.submit && <p className="text-red-500">{errors.submit}</p>}

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Show the success popup */}
      <PopUpSuccess show={showSuccessPopup} onClose={() => {
        setShowSuccessPopup(false) 
        navigate('/login')
      }
    
      } />
      
      {/* Show the failure popup with backend error message */}
      <PopUpFailed show={showFailedPopup} error={backendError} onClose={() => setShowFailedPopup(false)} />
    </div>
  );
}

export default Register;
