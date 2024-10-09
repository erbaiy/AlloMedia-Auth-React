import  { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { getData } from '../../hooks/sendData';


const VerifyEmail = () => {
    
    const {token} =useParams()
    
    const [loadingState, setLoadingState] = useState({ isLoading: false, success: false, notSuccess: false, backendError: "" }); 
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setLoadingState({ ...loadingState, isLoading: true });


                const response = await getData ("/register/verify-email?token="+token );
                console.log("here is the response ",response);
                if (response.status !== 200) {
                    setLoadingState({ ...loadingState, backendError: 'invalid token', notSuccess: true });
                    return;
                }
                setLoadingState({ ...loadingState, success: true });
                console.log(loadingState)

            } catch (error) {
                setLoadingState({ ...loadingState, backendError: "An unexpected error occurred", notSuccess: true });
                console.log(loadingState);

                throw error;
              
            } finally {
               console.log('finally');
            }
        };
        verifyEmail();
    }, [token]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Verify Email</div>
                        <div className="card-body">
                            {loadingState.isLoading && <p>Loading...</p>}
                            {loadingState.success ? <p>Email verified successfully</p>:<p>this email is already verified</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;