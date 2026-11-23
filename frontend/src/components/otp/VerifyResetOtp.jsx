import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Api from '../auth/Api';
import Loader from '../common/Loader';
import AllertMessage from '../common/AllertMessage';

const VerifyResetOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [otpCode, setOtpCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if(!email){
            navigate("/forgot-password");
        }
    },[email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post('/otp/verify-resetpass',{email, otpCode}).then(() => {
            setLoading(false);
            navigate('/reset-password',{state:{email}})
        }).catch((err) => {
            setLoading(false);
            console.log(err);
            setErrorMessage(err.response?.data || "Invalid Otp");
        })
    }

    const handleResend = async () => {
        setLoading(true);
        await Api.post("/auth/forgot-password",{email}).then(() => {
            setLoading(false);
            setSuccessMessage("Otp Sent Succesfully");
        }).catch((err) => {
            setLoading(false);
            setErrorMessage(err.response?.data || "Failed To Resend Otp")
        });    
    }

  return (
    <>
        <div className="container my-4 p-3 bg-light border shadow-sm rounded col-md-6">
            
            <h3 className='text-center mb-4'>
                Verify Otp
            </h3>

            <AllertMessage type='success' message={errorMessage}/>

            {
                errorMessage && (
                    <div className='alert alert-danger'>
                        {errorMessage}
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>

                {loading && (<Loader/>)}

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={otpCode}
                        onChange={(e) => {
                            setOtpCode(e.target.value)
                        }}
                        id="formId1"
                        required
                    />
                    <label htmlFor="formId1">Otp Code</label>
                </div>

                <div className="container d-flex justify-content-between ms my-3">
                    
                    <button type='submit' className='btn btn-outline-success btn-sm mt-3'>
                        Verify Otp
                    </button>

                    <button type='button' className='btn btn-outline-warning btn-sm mt-3' onClick={handleResend}>
                        Resend Otp
                    </button>

                </div>
                

            </form>
        </div>
        
    </>
  )
}

export default VerifyResetOtp