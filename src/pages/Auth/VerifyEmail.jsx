import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../../hooks/sendData';
import LefSide from './components/LefSide';

const VerifyEmail = () => {
  const { token } = useParams();
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    success: false,
    notSuccess: false,
    backendError: ""
  });

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
  useEffect(() => {

    verifyEmail();
    
  }, [token]);

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left-side background section */}
      <LefSide />

      {/* Right-side content section */}
      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div
            className={`flex flex-col space-y-2 text-center ${loadingState.success ? 'border border-green-500' : ''}`}
            style={{
              borderRadius: '15px',
              borderWidth: 'medium',
              textAlign: 'center'
            }}
          >
            <h1 className="text-2xl font-semibold tracking-tight">
              {loadingState.isLoading
                ? 'Verifying your email...'
                : loadingState.success
                ? 'Email Verified!'
                : 'Email Verification Failed'}
            </h1>
            {!loadingState.isLoading && loadingState.success && (
              <>
                <p className="text-sm text-muted-foreground">
                  Your email has been successfully verified! You can now login.
                </p>
                <div className="flex justify-center mt-2">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </>
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
                className=" underline hover:text-primary px-8 text-center text-sm text-muted-foreground "
              >
                Back
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
