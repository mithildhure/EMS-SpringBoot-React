import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Api from './Api';
import Loader from '../common/Loader';
import AllertMessage from '../common/AllertMessage';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post('/auth/forgot-password',{email}).then((result) => {
            setLoading(false);
            navigate('/verify-reset-otp',{
                state : {email}
            })
        }).catch((err) => {
            setLoading(false);
            console.log(err);
            setErrorMessage(err.response?.data || "Failed To Send Otp!");
        })
    }

  return (
    <>

        <div className="container my-4 p-3 bg-light border shadow-sm rounded col-md-6" >
            
            <h3 className='text-center mt-4 mb-4'>
                Forgot Password
            </h3>
            
            <AllertMessage type="danger" message={errorMessage} />

            <form onSubmit={handleSubmit}>

                {loading && (<Loader/>)}

                <div className="form-floating my-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="formId1"
                        required
                    />
                    <label htmlFor="formId1">Email</label>
                </div>
                    <div className="container d-flex justify-content-between">
                        
                        <button type='submit' className='btn btn-outline-success'>
                        Send Otp
                        </button>

                        <NavLink className='btn btn-outline-danger' to='/login' role='button'>
                            Return
                        </NavLink>

                    </div>
                              
            </form>
        </div>

    </>
  )
}

export default ForgotPassword