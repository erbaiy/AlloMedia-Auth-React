import { useRef, useState } from "react";
import { cn } from "@/lib/utils"; 
import { Link } from "react-router-dom"; 
import { Eye, EyeOff } from "lucide-react"; 
import { validateRegister } from "../../utils/validation"; 
import axios from "axios";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const roleRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ roles: [] });
  const [success, setSuccess] = useState(false);
  const[notSuccess, setNotSuccess] = useState(false);
  const [backendError,setBackendError]=useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const sendData = async () => { 
    setIsLoading(true);
    try {
       await axios.post("http://localhost:3500/register", formData);

      setSuccess(true);
      clearForm();
    } catch (error) {
      console.error( error.response.data.error); 
      // set error come from backend
      setBackendError(error.response.data.error)
      
      setNotSuccess(true); 
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrors = (error) => {
    const message = error.response?.data?.message || "Registration failed";
    setErrors({ submit: message });
  };

  const clearForm = () => {
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    roleRef.current.value = '';
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const selectedRole = roleRef.current.value;

    const { isValid, errors: validationErrors } = validateRegister(username, email, password, selectedRole);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setFormData({ username, email, password, roles: [selectedRole] });
    sendData();   
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
          <form onSubmit={handleSubmit} className={cn("grid gap-6")}>
            <div className="flex flex-col gap-4">
              <input type="text" className={`border p-2 rounded-md ${errors.username ? "border-red-500" : ""}`} placeholder="Username" ref={usernameRef} required />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
              
              <input type="email" className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`} placeholder="Email" ref={emailRef} required />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <div className="relative">
                <input type={showPassword ? "text" : "password"} className={`border p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""}`} placeholder="Password" ref={passwordRef} required />
                <button type="button" className="absolute right-2 top-2" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}

              <select className={`border border-gray-300 p-2 rounded-md w-full ${errors.role ? "border-red-500" : ""}`} ref={roleRef} required>
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Client">Client</option>
                <option value="Livreur">Livreur</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>

            {errors.submit && <p className="text-red-500">{errors.submit}</p>}

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>{" "} and{" "}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Registration Successful!</h2>
            <p className="mt-2">You have registered successfully. Please check your email for verification.</p>
            <button onClick={() => setSuccess(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Close</button>
          </div>
        </div>
      )}
      
      {notSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold">Registration Failed!</h2>
            <p className="mt-2">{backendError}.</p>
            <button onClick={() => setNotSuccess(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;








