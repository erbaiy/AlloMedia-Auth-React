// import  { useEffect, useState } from 'react';
// import {  useParams } from 'react-router-dom';
// import { getData } from '../../hooks/sendData';


// const VerifyEmail = () => {
    
//     const {token} =useParams()
    
//     const [loadingState, setLoadingState] = useState({ isLoading: false, success: false, notSuccess: false, backendError: "" }); 
//     useEffect(() => {
//         const verifyEmail = async () => {
//             try {
//                 setLoadingState({ ...loadingState, isLoading: true });


//                 const response = await getData ("/register/verify-email?token="+token );
//                 console.log("here is the response ",response);
//                 if (response.status !== 200) {
//                     setLoadingState({ ...loadingState, backendError: 'invalid token', notSuccess: true });
//                     return;
//                 }
//                 setLoadingState({ ...loadingState, success: true });
//                 console.log(loadingState)

//             } catch (error) {
//                 setLoadingState({ ...loadingState, backendError: "An unexpected error occurred", notSuccess: true });
//                 console.log(loadingState);

//                 throw error;
              
//             } finally {
//                console.log('finally');
//             }
//         };
//         verifyEmail();
//     }, [token]);
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-header">Verify Email</div>
//                         <div className="card-body">
//                             {loadingState.isLoading && <p>Loading...</p>}
//                             {loadingState.success ? <p>Email verified successfully</p>:<p>this email is already verified</p>}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default VerifyEmail;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../../hooks/sendData';

const VerifyEmail = () => {
  const { token } = useParams();
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    success: false,
    notSuccess: false,
    backendError: ""
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoadingState({ ...loadingState, isLoading: true });
         await getData(`/register/verify-email?token=${token}`);
        setLoadingState({ ...loadingState, success: true, isLoading: false });
      } catch (error) {
        setLoadingState({
          ...loadingState,
          backendError: "Invalid token or email already verified",
          notSuccess: true,
          isLoading: false
        });
        console.error(error);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left-side background section */}
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

      {/* Right-side content section */}
      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {loadingState.isLoading
                ? 'Verifying your email...'
                : loadingState.success
                ? 'Email Verified!'
                : 'Email Verification Failed'}
            </h1>
            {!loadingState.isLoading && loadingState.success && (
              <p className="text-sm text-muted-foreground">
                Your email has been successfully verified! You can now login.
              </p>
            )}
            {!loadingState.isLoading && loadingState.notSuccess && (
              <p className="text-sm text-red-500">{loadingState.backendError}</p>
            )}
          </div>

          {loadingState.success && (
            <div className="flex justify-center mt-4">
              <Link
                to="/login"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Go to Login
              </Link>
            </div>
          )}

          {!loadingState.success && !loadingState.isLoading && (
            <div className="flex justify-center mt-4">
              <Link
                to="/register"
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
