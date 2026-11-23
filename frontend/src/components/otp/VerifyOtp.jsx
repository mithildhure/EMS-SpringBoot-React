import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Api from '../auth/Api';
import Loader from '../common/Loader';
import AllertMessage from '../common/AllertMessage';

const VerifyOtp = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || localStorage.getItem("unverifiedEmail") ||'';
    const [otpCode, setOtpCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    },[email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post("/otp/verify-email",{email, otpCode}).then((result) => {
            setLoading(false);
            setSuccessMessage('Email Verified Succesfully!')
            localStorage.removeItem("unverifiedEmail");
            navigate("/login");
        }).catch((err) => {
            setLoading(false);
            setErrorMessage(err.response?.data || "Invalid OTP");
            console.log(err);
        });
    }

    const handleResend = async () => {
        await Api.post("/otp/resend",{email:localStorage.getItem("unverifiedEmail")}).then((result) => {
            setSuccessMessage('Otp Sent Succesfully!');
        }).catch((err) => {
            setErrorMessage(err.response?.data || "Failed To Resend Otp!");
            console.log(err);
        })
    }

  return (
    <>

    <div className="container my-5 p-2 text-center bg-light border shadow-sm rounded col-4">
        <h4 className='text-center my-2 p-3'>Verifcation Otp</h4>

        <AllertMessage type="success" message={successMessage} />       

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
                    id="otpCode"
                    maxLength="6"
                    minLength="6"
                    required
                />
                <label htmlFor="otpCode">Verification Code</label>
            </div>
            <button
                type="submit"
                className="btn btn-outline-success"
            >
                Submit
            </button>
        </form>

        <div
            className="container d-flex flex-row-reverse ms my-3"
        >
            <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={handleResend}
            >
                Resend Otp
            </button>
        </div>

        <AllertMessage type="danger" message={errorMessage} />

    </div>
    

    </>
  )
}

export default VerifyOtp