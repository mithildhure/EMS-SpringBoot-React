import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Api from './Api';
import Loader from '../common/Loader';
import AllertMessage from '../common/AllertMessage';

const ResetPassword = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    },[email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post("/auth/reset-password",{email, newPassword}).then(() => {
            setLoading(false);
            setSuccessMessage('Password Updated Succesfully');
            navigate("/login");
        }).catch((err) => {
            setLoading(false);
            setErrorMessage(err.response?.data || "Failed To Update Password")
        });
    }

  return (
    <>
        
        <div className="container my-4 p-3 bg-light border shadow-sm rounded col-md-6">
            
            <h3 className='text-center mb-4'>
                Reset Password
            </h3>

            <AllertMessage type="success" message={successMessage} />

            <form onSubmit={handleSubmit}>

                {loading && (<Loader/>)}

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="formId1"
                        required
                    />
                    <label htmlFor="formId1">New Password</label>
                </div>

                <AllertMessage type="danger" message={errorMessage} />

                <button type="submit" className="btn btn-outline-success" >
                    Update Password
                </button>
            </form>
        </div>
    </>
  )
}

export default ResetPassword